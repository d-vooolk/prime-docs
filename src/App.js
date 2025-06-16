import './App.css';
import printJS from "print-js";
import React, {useState} from "react";
import RequestPage from "./components/RequestPage/RequestPage";
import EditModal from "./components/EditModal/EditModal";
import {Button, Input, Radio} from "antd";
import ActPage from "./components/ActPage/ActPage";
import {saveJsonToFile} from "./utils/saveFile";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowAct, setIsShowAct] = useState(false);

    const [customerData, setCustomerData] = useState(defaultCustomerData);
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
        <div>
            {
                !isShowAct
                    ? (<RequestPage customerData={customerData}/>)
                    : (<ActPage customerData={customerData} />)
            }

            <div className="buttons">
                <div>
                    <Button type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>Редактировать данные</Button>
                    {!isShowAct && <Button type="dashed" onClick={handlePrintRequest}>Печать заявки</Button>}
                    {isShowAct && <Button type="dashed" onClick={handlePrintAct}>Печать акта</Button>}
                    <Button onClick={() => setCustomerData(defaultCustomerData)}>Очистить</Button>
                </div>
                <div>
                    <Button
                        onClick={
                            () => saveJsonToFile(
                                customerData,
                                `${customerData.name}-${customerData.carData.name}-${customerData.dateRange[0]}${fileExtention}`
                            )}>
                        Сохранить данные
                    </Button>

                    <Input type="file" accept=".json" onChange={handleFileUpload}/>
                </div>
            </div>
            <Radio.Group
                block
                options={modeOptions}
                defaultValue="request"
                optionType="button"
                buttonStyle="solid"
                style={{position: 'fixed', top: '170px', right: '50px'}}
                onChange={() => setIsShowAct(!isShowAct)}
            />

            <EditModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                customerData={customerData}
                setCustomerData={setCustomerData}
            />
        </div>
    );
}

export default App;
