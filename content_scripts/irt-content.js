function createImageModal(request, sender, sendResponse) {

	for (let value in request) {
		switch(value) {
		    case "imgURL":
	      insertImageModal(request.imgURL);
	      sessionStorage.setItem('imgUrlIrt', request.imgURL);
		        break;
		    case "reportTextAreaVal":
	            sendDataToSever(request.reportTextAreaVal);
		        break;
		    case "screenWasAddedVariable":
	            sessionStorage.clear();
		        break;
		}
	}

};

function insertImageModal(imgURL) {
	const modalHtmlBlock = document.querySelector('#reportPopupContent');
	if (!modalHtmlBlock) {
      ModalReportView.addModalStyles();
      let img = document.createElement("img");
      img.src = imgURL;
      ModalReportView.createPopup(img);
	}
 };


function sendDataToSever(reportMsg) {

  let dataObjFromSite = {
	cookies: document.cookie,
	siteUrl : location.href,
	imageUrl: !sessionStorage.getItem('imgUrlIrt') ? "" : sessionStorage.getItem('imgUrlIrt'),
	message: reportMsg
  };

  console.log(dataObjFromSite);

  let myInit = {
      method: 'POST'
  };

  fetch("http://irt.tsalikayeva.snx702.dyninno.net/report", myInit)
      .then((response) => {
          console.log(response);
          response.json().then((data) => {

          });
      })
      .catch(function(err) {
          console.log('Fetch Error :-S', err);
      }); 

        
}

chrome.runtime.onMessage.addListener(createImageModal);



