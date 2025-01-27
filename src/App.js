import './App.css';
import printJS from "print-js";
import {useState} from "react";
import RequestPage from "./components/RequestPage/RequestPage";
import EditModal from "./components/EditModal/EditModal";
import {Button, Radio} from "antd";

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

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowAct, setIsShowAct] = useState(false);

    const [customerData, setCustomerData] = useState(
        {
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
        }
    );
    const handlePrint = () => {
        printJS({
            printable: 'printable',
            type: 'html',
            targetStyles: ['*'],
            showModal: true,
            header: null,
            footer: null,
        });
    };

    return (
        <div>
            {
                !isShowAct
                ? (
                        <RequestPage customerData={customerData} />
                    )
                    : (
                        <></>
                    )
            }

            <div className="buttons">
                <Button type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>Редактировать данные</Button>
                <Button type="dashed" onClick={handlePrint}>Печать заявки</Button>
            </div>
            <Radio.Group
                block
                options={modeOptions}
                defaultValue="request"
                optionType="button"
                buttonStyle="solid"
                style={{ width: '345px', position: 'fixed', top: '100px', right: '50px' }}
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
