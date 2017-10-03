
const ModalReportIrt = class modalReportClass {
	constructor() {
		this.popup = "";
	}

	createPopup(img) {

		const popupData = {
			headerTitle: "Check screen before submit",
			screenSubmitButtonText: "Send",
			closePopupButtonText: "Cancel"
		};

		const closeIcon = `<svg class="icon-close" viewBox="0 0 20 20">
							<path fill="${this.colorTheme}" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
						</svg>`;

		this.popup  = document.createElement("div");
		this.popup.id = "reportPopupContent";
		this.popup.className = 'report-popup-wrapper';

		const popupHeader =  document.createElement("h2");
		popupHeader.innerHTML = popupData.headerTitle;
		this.popup.appendChild(popupHeader);

		const closeLink = document.createElement("a");
		closeLink.className = "report-popup-close";
		closeLink.innerHTML = closeIcon;
		closeLink.addEventListener("click", (event) => {
			this.closeModal();
		});
		this.popup.appendChild(closeLink);

		const popupImgContainer = document.createElement("div");
		popupImgContainer.className = "report-popup-body";
		popupImgContainer.style.borderColor = this.colorTheme;
		popupImgContainer.appendChild(img);
		this.popup.appendChild(popupImgContainer);

		const popupFooter = document.createElement("div");
		popupFooter.className = "report-popup-footer";
		const closePopupButton = document.createElement("a");
		closePopupButton.className = "report-popup-cancel";
		closePopupButton.innerHTML = popupData.closePopupButtonText;
		closePopupButton.addEventListener("click", (event) => {
			this.closeModal();
		});

		const screenSubmitButton = document.createElement("button");
		screenSubmitButton.className = "report-popup-submit";
		screenSubmitButton.style.background = this.colorTheme;
		screenSubmitButton.innerHTML = popupData.screenSubmitButtonText;
		screenSubmitButton.addEventListener("click", (event) => {
			chrome.runtime.sendMessage({screenWasAdded: true});  			
			document.body.removeChild(this.popup); 
		});

		popupFooter.appendChild(closePopupButton);
		popupFooter.appendChild(screenSubmitButton);
		this.popup.appendChild(popupFooter);

		document.body.appendChild(this.popup);

	}

	closeModal() {
		document.body.removeChild(this.popup);
		sessionStorage.setItem('imgUrlIrt', false);
        chrome.runtime.sendMessage({screenWasAdded: false});

        location.reload();
	}

	addModalStyles() {

	    const modalCss = `
	      .butn-common,
	      .report-popup-footer .report-popup-submit {
	          position: relative;
	          padding: 8px 26px;
	          border: none;
	          font-weight: bold;
	          font-size: 14px;
	          color: white;
	          line-height: 1;
	          background: #5cb85c;
	          cursor: pointer
	      }
	      .butn-common:before,
	      .report-popup-footer .report-popup-submit:before {
	          position: absolute;
	          bottom: 0;
	          content: "";
	          height: 2px;
	          left: auto;
	          right: 50%;
	          left: 50%;
	          background: #fff;
	          transition: all 0.5s ease
	      }
	      .butn-common:hover:before,
	      .report-popup-footer .report-popup-submit:hover:before {
	          left: 0;
	          right: 0
	      }
	      .report-popup-wrapper {
	          position: fixed;
	          overflow: hidden;
	          top: 50%;
	          left: 50%;
	          width: 66%;
	          height: 95%;
	          transform: translate(-50%, -50%);
	          border: 1px solid #ccc;
	          z-index: 99999;
	          padding: 30px 20px;
	          font-family: "Courier New";
	          box-sizing: border-box;
	          background: rgba(0, 0, 0, 0.7)
	      }
	      .report-popup-wrapper .report-popup-close {
	          position: absolute;
	          top: 10px;
	          right: 10px;
	          width: 31px;
	          cursor: pointer
	      }
	      .report-popup-wrapper .report-popup-close:hover path {
	          fill: #ccc
	      }
	      .report-popup-wrapper h2 {
	          color: #fafafa;
	          font-size: 26px;
	          margin: 0 0 20px;
	          text-align: center;
	          font-weight: normal
	      }
	      .report-popup-wrapper:hover .report-popup-footer {
	          bottom: 0;
	          visibility: visible
	      }
	      .report-popup-body {
	          overflow: auto;
	          width: 100%;
	          height: calc(100% - 86px);
	          background: #fff;
	          border: 1px solid #ccc
	      }
	      .report-popup-footer {
	          position: absolute;
	          visibility: hidden;
	          display: flex;
	          justify-content: flex-end;
	          align-items: center;
	          left: 0;
	          right: 0;
	          top: auto;
	          bottom: -60px;
	          height: 60px;
	          padding: 0 20px;
	          transition: all 0.5s ease;
	          background: rgba(0, 0, 0, 0.5)
	      }
	      .report-popup-footer .report-popup-cancel {
	          padding: 0 20px 0 0;
	          font-size: 16px;
	          color: #fafafa;
	          cursor: pointer
	      }	      

	   `;

	    let modalStyles = document.createElement('style');
	    modalStyles.innerHTML = modalCss;
	    let docBody = document.getElementsByTagName("body")[0];
	    docBody.parentNode.insertBefore(modalStyles, docBody.nextSibling)

	}

};

(function (window) {
    window.ModalReportView = new ModalReportIrt();
}(window));