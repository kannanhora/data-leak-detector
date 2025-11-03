// Content script for AI Data Leak Detector extension

// Function to analyze the current page for potential data leaks
function analyzePage() {
  console.log('Analyzing page for data leaks:', window.location.href);
  
  // Send message to background script to perform scan
  chrome.runtime.sendMessage(
    { action: 'scanPage', url: window.location.href },
    (response) => {
      if (response) {
        console.log('Scan results:', response);
        
        // If high risk is detected, show notification
        if (response.riskScore > 70) {
          showNotification('High risk detected on this page!');
        }
      }
    }
  );
}

// Function to show in-page notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = '#ff4757';
  notification.style.color = 'white';
  notification.style.padding = '12px 20px';
  notification.style.borderRadius = '8px';
  notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  notification.style.zIndex = '9999';
  notification.style.fontFamily = 'Arial, sans-serif';
  notification.style.fontSize = '14px';
  notification.style.display = 'flex';
  notification.style.alignItems = 'center';
  notification.style.gap = '8px';
  
  // Add shield icon
  const icon = document.createElement('span');
  icon.innerHTML = '🛡️';
  notification.appendChild(icon);
  
  // Add message text
  const text = document.createElement('span');
  text.textContent = message;
  notification.appendChild(text);
  
  // Add close button
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '✕';
  closeBtn.style.marginLeft = '10px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = () => notification.remove();
  notification.appendChild(closeBtn);
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'autoScan') {
    analyzePage();
  }
  return true;
});

// Run initial analysis when page loads
window.addEventListener('load', () => {
  // Wait a moment for page to fully render
  setTimeout(analyzePage, 1500);
});