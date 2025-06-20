import './App.css';
import printJS from "print-js";
import React, {useRef, useState} from "react";
import RequestPage from "./components/RequestPage/RequestPage";
import EditModal from "./components/EditModal/EditModal";
import {Input, Radio} from "antd";
import ActPage from "./components/ActPage/ActPage";
import {saveJsonToFile} from "./utils/saveFile";
import {EditTwoTone, FileAddTwoTone, MessageTwoTone, PrinterTwoTone, SaveTwoTone} from "@ant-design/icons";

const fileExtention = '.json';

const modeOptions = [
    {
        label: 'Заявка',
        value: 'request',
    },
    {
        label: 'Акт',
        value: 'act',
    },
];

const printSettings = {
    type: 'html',
    targetStyles: ['*'],
    showModal: true,
    header: null,
    footer: null,
};

const defaultCustomerData = {
    requestNumber: '',
    name: '',
    phone: '',
    carData: {
        name: '',
        number: '',
        vin: '',
        year: '',
        km: '',
    },
    jobReason: '',
    firstPrice: '',
    dateRange: '',
    serviceman: '',
    requestDate: '',
    customerRepresentative: '',

    discoveredFlaws: '',
    valueJustification: '',
    fullPrice: '',
    workEnd: '',
    warranty: '',
    module: '',
}

function App() {
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowAct, setIsShowAct] = useState(false);

    const [customerData, setCustomerData] = useState(defaultCustomerData);

    const handleButtonClick = () => {
        fileInputRef?.current?.input?.click();
    };

    async function sendSMS(phone) {
        try {
            const response = await fetch('http://217.12.37.199:3008/api/sms/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone,
                    message: "Здравствуйте, ваш автомобиль готов. Можете забрать его с 10:00 до 19:00."
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Успешно отправлено:', data);
            return data;

        } catch (error) {
            console.error('Ошибка при отправке:', error);
            return { success: false, error: error.message };
        }
    }


    const handlePrintRequest = () => {
        printJS({
            printable: 'printableRequest',
            ...printSettings,
        });
    };

    const handlePrintAct = () => {
        printJS({
            printable: 'printableAct',
            ...printSettings,
        });
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0]; // Получаем выбранный файл

        if (file && file.type === 'application/json') {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const parsedData = JSON.parse(e.target.result);
                    setCustomerData(parsedData);
                } catch (error) {
                    console.error('Ошибка при чтении файла:', error);
                    alert('Файл не является валидным JSON.');
                }
            };

            reader.readAsText(file); // Читаем файл как текст
        } else {
            alert('Пожалуйста, выберите JSON-файл.');
        }
    };

    return (
        <>
            <div style={{
                position: "fixed",
                height: "3vh",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "10px",
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingRight: "50px",
                    gap: "15px",
                    alignItems: "center"
                }}>
                    <EditTwoTone onClick={() => setIsModalOpen(!isModalOpen)} className="action-button"/>
                    <PrinterTwoTone onClick={isShowAct ? handlePrintAct : handlePrintRequest} className="action-button"/>
                    <SaveTwoTone
                        onClick={() => saveJsonToFile(
                            customerData,
                            `${customerData.name}-${customerData.carData.name}-${customerData.dateRange[0]}${fileExtention}`
                        )}
                        className="action-button"
                    />
                    <Input type="file" accept=".json" onChange={handleFileUpload} ref={fileInputRef} style={{ display: "none" }} />
                    <FileAddTwoTone onClick={handleButtonClick} className="action-button"/>
                    <Radio.Group
                        block
                        options={modeOptions}
                        defaultValue="request"
                        optionType="button"
                        buttonStyle="solid"
                        onChange={() => setIsShowAct(!isShowAct)}
                    />
                    <MessageTwoTone className="action-button" onClick={() => sendSMS(customerData?.phone)} />
                </div>
            </div>
            <div>
                {
                    !isShowAct
                        ? (<RequestPage customerData={customerData}/>)
                        : (<ActPage customerData={customerData}/>)
                }

                <EditModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    customerData={customerData}
                    setCustomerData={setCustomerData}
                />
            </div>
        </>
    );
}

export default App;
