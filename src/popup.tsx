/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./components/ui/card";
import browserAPI, { getBrowserInfo } from "./lib/browser-api";
import "./index.css";

export const PopupApp = () => {
  const [activeTab, setActiveTab] = useState<any>(null);
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const browserInfo = getBrowserInfo();

  useEffect(() => {
    // Get the active tab
    const fetchActiveTab = async () => {
      try {
        const tabs = await browserAPI.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (tabs && tabs.length > 0) {
          setActiveTab(tabs[0]);

          // Get page info from content script
          try {
            const response = await browserAPI.tabs.sendMessage(tabs[0].id!, {
              type: "GET_PAGE_INFO",
            });
            setPageInfo(response.data);
          } catch (err: any) {
            console.error("Error communicating with content script:", err);
            setError(
              "Content script not accessible. The extension may need page refresh or additional permissions."
            );
          }
        }
      } catch (err: any) {
        console.error("Error getting active tab:", err);
        setError(err.message || "Failed to get active tab");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTab();
  }, []);

  return (
    <div className="min-w-[350px] p-4 max-h-[600px] overflow-y-auto ">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">My Extension</CardTitle>
          <CardDescription>
            Walking on {browserInfo.name} (Manifest v
            {browserInfo.manifestVersion})
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-4">Loading...</div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-3 rounded">
              Error: {error}
            </div>
          ) : (
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info text-white bg-white">
                  Page Info
                </TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Current Page</h3>
                  <p className="text-sm truncate">{activeTab?.url}</p>

                  {pageInfo && (
                    <>
                      <h3 className="font-medium mt-2">Title</h3>
                      <p className="text-sm">{pageInfo.title}</p>

                      {pageInfo.metaDescription && (
                        <>
                          <h3 className="font-medium mt-2">Description</h3>
                          <p className="text-sm">{pageInfo.metaDescription}</p>
                        </>
                      )}
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="actions">
                <div className="space-y-4">
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (activeTab?.id) {
                        browserAPI.tabs.sendMessage(activeTab.id, {
                          type: "SHOW_STATUS",
                        });
                      }
                    }}
                  >
                    Show Page Status
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      browserAPI.runtime.sendMessage({
                        type: "SAVE_DATA",
                        data: {
                          lastVisited: activeTab?.url,
                          timestamp: Date.now(),
                        },
                      });
                    }}
                  >
                    Save Current Page
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Render the popup
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>
);
