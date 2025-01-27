import './App.css';
import printJS from "print-js";
import {useState} from "react";
import RequestPage from "./components/RequestPage/RequestPage";
import EditModal from "./components/EditModal/EditModal";
import {Button, Radio} from "antd";
import ActPage from "./components/ActPage/ActPage";

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

    return (
        <div>
            {
                !isShowAct
                    ? (<RequestPage customerData={customerData}/>)
                    : (<ActPage customerData={customerData} />)
            }

            <div className="buttons">
                <Button type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>Редактировать данные</Button>
                { !isShowAct && <Button type="dashed" onClick={handlePrintRequest}>Печать заявки</Button> }
                { isShowAct && <Button type="dashed" onClick={handlePrintAct}>Печать акта</Button> }
                <Button onClick={() => setCustomerData(defaultCustomerData)}>Очистить</Button>
            </div>
            <Radio.Group
                block
                options={modeOptions}
                defaultValue="request"
                optionType="button"
                buttonStyle="solid"
                style={{position: 'fixed', top: '100px', right: '50px'}}
                onChange={() => setIsShowAct(!isShowAct)}
            />

            <EditModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setCustomerData={setCustomerData}
            />
        </div>
    );
}

export default App;
