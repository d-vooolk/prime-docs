import './App.css';
import printJS from "print-js";
import React, {useEffect, useMemo, useRef, useState} from "react";
import RequestPage from "./components/RequestPage/RequestPage";
import EditModal from "./components/EditModal/EditModal";
import {Input, notification, Radio, Tooltip} from "antd";
import ActPage from "./components/ActPage/ActPage";
import {saveJsonToFile} from "./utils/saveFile";
import {
    EditTwoTone,
    FileAddTwoTone,
    MessageTwoTone,
    PrinterTwoTone,
    SmileTwoTone
} from "@ant-design/icons";
import {
    DEFAULT_CUSTOMER_DATA,
    FILE_EXTENTION,
    MODE_OPTIONS,
    PRINT_SETTINGS, SERVICE_OPTIONS_NAMES,
    SERVICES_OPTIONS
} from "./constants/constants";
import {FEEDBACK_LINK, FEEDBACK_REQUEST, JOB_DONE} from "./utils/smsConstants";
import {sendSMS} from "./utils/sms";
import {generateRandomCode} from "./utils/randomIndexForDocs";

const Context = React.createContext({ name: 'Default' });

const date = new Date().toLocaleDateString();

function App() {
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowAct, setIsShowAct] = useState(false);
    const [customerData, setCustomerData] = useState(DEFAULT_CUSTOMER_DATA);
    const [api, contextHolder] = notification.useNotification();
    const [randomFileCode, setRandomFileCode] = useState();
    const [serviceOption, setServiceOption] = useState(SERVICE_OPTIONS_NAMES.headlights);

    useEffect(() => {
        if (!customerData?.randomFileCode) {
            setRandomFileCode(generateRandomCode());
            setCustomerData({randomFileCode: randomFileCode, ...customerData})
        }
    }, [])

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
        saveJson();
        printJS({
            printable: 'printableRequest',
            ...PRINT_SETTINGS,
        });
    };

    const handlePrintAct = () => {
        saveJson();
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
                    const parsedData = JSON.parse(e?.target?.result);
                    if (parsedData?.randomFileCode) {
                        setCustomerData(parsedData);
                    } else {
                        setCustomerData({randomFileCode: generateRandomCode(), ...parsedData});
                    }
                } catch (error) {
                    console.error('Ошибка при чтении файла:', error);
                    alert('Файл не является валидным JSON.');
                }
            };

            reader.readAsText(file);
        } else {
            alert('Пожалуйста, выберите JSON-файл.');
        }
    };

    const saveJson = () => saveJsonToFile(
        customerData,
        `${customerData?.name}-${customerData?.carData.name}-${date}${FILE_EXTENTION}`
    );

    return (
            <Context.Provider value={contextValue}>
                {contextHolder}

                <Radio.Group
                    block
                    options={SERVICES_OPTIONS}
                    defaultValue={SERVICE_OPTIONS_NAMES.headlights}
                    optionType="button"
                    buttonStyle="solid"
                    onChange={(e) => setServiceOption(e.target.value)}
                    style={{ position: 'fixed', top: '1%', left: '45%', zIndex: "999" }}
                />

            <div style={{
                position: "fixed",
                height: "3vh",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "10px",
                zIndex: 998,
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingRight: "50px",
                    gap: "15px",
                    alignItems: "center",
                }}>
                    <Tooltip placement="bottom" title="Редактировать данные">
                        <EditTwoTone onClick={() => setIsModalOpen(!isModalOpen)} className="action-button"/>
                    </Tooltip>

                    <Tooltip placement="bottom" title="Распечатать">
                        <PrinterTwoTone onClick={isShowAct ? handlePrintAct : handlePrintRequest} className="action-button"/>
                    </Tooltip>

                    <Input type="file" accept=".json" onChange={handleFileUpload} ref={fileInputRef} style={{ display: "none" }} />
                    <Tooltip placement="bottom" title="Загрузить клиента">
                        <FileAddTwoTone onClick={handleButtonClick} className="action-button"/>
                    </Tooltip>

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
                        && <Tooltip placement="bottom" title="Оповестить о готовности авто">
                            <MessageTwoTone
                                className="action-button"
                                onClick={() => sendSMS(customerData?.phone, JOB_DONE, openNotification)}
                            />
                        </Tooltip>
                    }

                    {
                        customerData?.phone
                        && <Tooltip placement="bottom" title="Запросить отзыв">
                            <SmileTwoTone
                                className="action-button"
                                onClick={
                                    () => sendSMS(customerData?.phone, FEEDBACK_REQUEST, openNotification)
                                        .then(() => sendSMS(customerData?.phone, FEEDBACK_LINK, openNotification))
                                }
                            />
                        </Tooltip>
                    }
                </div>
            </div>
            <div>
                {
                    !isShowAct
                        ? (<RequestPage customerData={customerData} date={date} serviceOption={serviceOption} />)
                        : (<ActPage customerData={customerData} date={date} serviceOption={serviceOption} />)
                }

                <EditModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    customerData={customerData}
                    setCustomerData={setCustomerData}
                    serviceOption={serviceOption}
                />
            </div>
        </Context.Provider>
    );
}

export default App;
