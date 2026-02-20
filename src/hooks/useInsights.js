import { useEffect, useState, useCallback } from "react";

export function useInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data exactly as per PDF specification
      const data = [
        {
          id: "uuid-1234",
          meta: {
            generated_at: "2024-02-14T10:00:00Z",
            model_version: "v2.1",
            confidence_score: 0.89,
          },
          payload: {
            type: "text_summary",
            content: "Sales increased by 15% due to new marketing channels.",
            sources: ["campaign_report.pdf", "q3_financials.xlsx"],
          },
          status: "completed"
        },
        {
          id: "uuid-5678",
          meta: {
            confidence_score: 0.45,
          },
          payload: {
            type: "alert",
            severity: "high",
            content: "Anomaly detected in server logs.",
            sources: ["server_logs.txt"],
          },
          status: "processing"
        },
        // Add more diverse examples
        {
          id: "uuid-9012",
          meta: {
            generated_at: "2024-02-14T09:30:00Z",
            model_version: "v2.0",
            confidence_score: 0.92,
          },
          payload: {
            type: "text_summary",
            content: "User engagement increased by 23% following the UI redesign. Mobile users show 2x higher retention rates.",
            sources: ["analytics_dashboard.sql", "user_feedback.pdf"],
          },
          status: "completed"
        },
        {
          id: "uuid-3456",
          meta: {
            generated_at: "2024-02-14T08:15:00Z",
            confidence_score: 0.38,
          },
          payload: {
            type: "alert",
            severity: "medium",
            content: "Unusual traffic pattern detected from EU region. Possible bot activity.",
            sources: ["traffic_logs.txt", "security.sql"],
          },
          status: "completed"
        }
      ];
      
      setInsights(data);
    } catch {
      setError("Source disconnected. Failed to fetch insights.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return { insights, loading, error, retry: fetchInsights };
}