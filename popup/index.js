const makeScreenTrigger = document.getElementById("makeScreen");
const removeScreenTrigger = document.getElementById("screenWasAdded");

makeScreenTrigger.addEventListener("click", (e) => {
    e.preventDefault();

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        chrome.tabs.captureVisibleTab(null, {}, (data) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                imgURL: data
            });

        });
    });
});

removeScreenTrigger.addEventListener("click", (e) => {
      e.preventDefault();

      setScreenState(false);
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {screenWasAddedVariable: false});
      });   
});

document.getElementsByClassName("but-send")[0].addEventListener("click", (e) => {
    e.preventDefault();
    const sendButton = e.target;
    const reportTextArea = document.querySelector('.report-body textarea');
    const reportTextAreaVal = reportTextArea.value;

    if (reportTextAreaVal.length !== 0) {

      reportTextArea.classList.remove("empty-message");
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {reportTextAreaVal: reportTextAreaVal});
      });   

    } else {
        reportTextArea.classList.add("empty-message");
    }

});

function setScreenAdded(request, sender, sendResponse) {
   setScreenState(request.screenWasAdded);
}

function setScreenState(isScreenMade) {
    if (isScreenMade) {
      makeScreenTrigger.style.display = "none";
      removeScreenTrigger.style.display = "block";      
   } else {
      makeScreenTrigger.style.display = "block";
      removeScreenTrigger.style.display = "none";
   }
   let screenAddVar = {"screenWasAddedVariable": isScreenMade};
   chrome.storage.local.set(screenAddVar);
}

window.onload = function() {

   chrome.storage.local.get("screenWasAddedVariable", function(item) { 
    console.log(item.screenWasAddedVariable);
    setScreenState(item.screenWasAddedVariable);
  });
  chrome.runtime.onMessage.addListener(setScreenAdded);
   
}

