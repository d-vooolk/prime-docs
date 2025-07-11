import './App.css';
import printJS from "print-js";
import React, {useMemo, useRef, useState} from "react";
import RequestPage from "./components/RequestPage/RequestPage";
import EditModal from "./components/EditModal/EditModal";
import {Input, notification, Radio} from "antd";
import ActPage from "./components/ActPage/ActPage";
import {saveJsonToFile} from "./utils/saveFile";
import {
    EditTwoTone,
    FileAddTwoTone,
    MessageTwoTone,
    PrinterTwoTone,
    SaveTwoTone, SmileTwoTone
} from "@ant-design/icons";
import {DEFAULT_CUSTOMER_DATA, FILE_EXTENTION, MODE_OPTIONS, PRINT_SETTINGS} from "./constants/constants";
import {FEEDBACK_LINK, FEEDBACK_REQUEST, JOB_DONE} from "./utils/smsConstants";
import {sendSMS} from "./utils/sms";

const Context = React.createContext({ name: 'Default' });

function App() {
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowAct, setIsShowAct] = useState(false);

    const [customerData, setCustomerData] = useState(DEFAULT_CUSTOMER_DATA);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (text, error) => {
        api.info({
            message: text,
            description: <Context.Consumer>
                            {
                                () => {
                                    if (error) {
                                        return `Произошла ошибка: ${error}`
                                    }
                                    return `Клиент уведомлён. Хорошая работа!`
                                }
                            }
                        </Context.Consumer>,
            placement: "topRight",
        });
    };

    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

    const handleButtonClick = () => {
        fileInputRef?.current?.input?.click();
    };


    const handlePrintRequest = () => {
        printJS({
            printable: 'printableRequest',
            ...PRINT_SETTINGS,
        });
    };

    const handlePrintAct = () => {
        printJS({
            printable: 'printableAct',
            ...PRINT_SETTINGS,
        });
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

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
            <Context.Provider value={contextValue}>
                {contextHolder}
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
                            `${customerData.name}-${customerData.carData.name}-${customerData.dateRange[0]}${FILE_EXTENTION}`
                        )}
                        className="action-button"
                    />
                    <Input type="file" accept=".json" onChange={handleFileUpload} ref={fileInputRef} style={{ display: "none" }} />
                    <FileAddTwoTone onClick={handleButtonClick} className="action-button"/>
                    <Radio.Group
                        block
                        options={MODE_OPTIONS}
                        defaultValue="request"
                        optionType="button"
                        buttonStyle="solid"
                        onChange={() => setIsShowAct(!isShowAct)}
                    />
                    {
                        customerData?.phone
                        && <MessageTwoTone
                                className="action-button"
                                onClick={() => sendSMS(customerData?.phone, JOB_DONE, openNotification)}
                            />
                    }

                    {
                        customerData?.phone
                        && <SmileTwoTone
                            className="action-button"
                            onClick={
                                () => sendSMS(customerData?.phone, FEEDBACK_REQUEST, openNotification)
                                    .then(() => sendSMS(customerData?.phone, FEEDBACK_LINK, openNotification))
                            }
                            />
                    }
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
        </Context.Provider>
    );
}

export default App;
