// Confidence score thresholds exactly as per PDF (Green/Yellow/Red)
export const CONFIDENCE_THRESHOLDS = {
  GREEN: 70,   // 70% and above = Green
  YELLOW: 40,  // 40-69% = Yellow, below 40% = Red
};

// Get color based on confidence score (0-100%)
export function getConfidenceColor(score) {
  const percentage = score * 100;
  
  if (percentage >= CONFIDENCE_THRESHOLDS.GREEN) {
    return 'green';   // High confidence
  } else if (percentage >= CONFIDENCE_THRESHOLDS.YELLOW) {
    return 'yellow';  // Medium confidence
  } else {
    return 'red';     // Low confidence
  }
}

// Format score for display
export function formatConfidenceScore(score) {
  return `${Math.round(score * 100)}%`;
}

// Get title based on payload type
export function getInsightTitle(type, severity) {
  const titles = {
    'text_summary': '📊 Insight Summary',
    'alert': severity === 'high' ? '🚨 Critical Alert' : '⚠️ System Alert',
    'trend': '📈 Trend Detection',
    'prediction': '🔮 AI Prediction',
    'default': '💡 AI Insight'
  };
  
  return titles[type] || titles.default;
}