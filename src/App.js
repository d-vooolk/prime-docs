import './App.css';
import printJS from "print-js";
import {useState} from "react";
import RequestPage from "./components/RequestPage/RequestPage";
import EditModal from "./components/EditModal/EditModal";
import {Button} from "antd";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            <RequestPage customerData={customerData} />

            <div>
                <Button type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>Редактировать</Button>
                <Button type="dashed" onClick={handlePrint}>Распечатать элемент</Button>
            </div>

            <EditModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setCustomerData={setCustomerData}
            />
        </div>
    );
}

export default App;
