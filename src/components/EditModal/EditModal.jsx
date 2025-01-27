import React, {useEffect} from "react";
import {Button, DatePicker, Form, Input, Modal} from "antd";
import {useForm} from "antd/es/form/Form";

const dateFormat = 'DD-MM-YYYY';

const EditModal = ({ isModalOpen, setIsModalOpen, setCustomerData }) => {
    const [form] = useForm();

    useEffect(() => {
        console.log(form.getFieldsValue());
    }, [form.getFieldsValue()]);

    const okHandler = () => {
        const date = [
            form?.getFieldValue('firstDateToDoneWork')?.[0]?.$d?.toLocaleDateString(),
            form?.getFieldValue('firstDateToDoneWork')?.[1]?.$d?.toLocaleDateString()
        ];
        setCustomerData((prevState) => ({
            ...prevState,
            requestNumber: form.getFieldValue("requestNumber"),
            name: form.getFieldValue("name"),
            phone: form.getFieldValue("phone"),
            carData: {
                name: form.getFieldValue("carData.name"),
                number: form.getFieldValue("carData.number"),
                vin: form.getFieldValue("carData.vin"),
                year: form.getFieldValue("carData.year"),
                km: form.getFieldValue("carData.km"),
            },
            jobReason: form.getFieldValue("jobReason"),
            firstPrice: form.getFieldValue("firstPrice"),
            dateRange: date,
            serviceman: form.getFieldValue("serviceman"),
            requestDate: form.getFieldValue("requestDate"),
            customerRepresentative: form.getFieldValue("customerRepresentative"),
        }))
        setIsModalOpen(false);
    }

    const cancelHandler = () => {
        form.resetFields();
        setIsModalOpen(false);
    }

    const { RangePicker } = DatePicker;

    return (
        <Modal
            open={isModalOpen}
            onOk={() => okHandler()}
            onCancel={() => cancelHandler()}
        >
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 800}}
                initialValues={{remember: true}}
                autoComplete="true"
                form={form}
            >
                <Form.Item
                    label="Порядковый номер"
                    name="requestNumber"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="ФИО"
                    name="name"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Телефон"
                    name="phone"
                    rules={[{required: true}]}
                    initialValue="+375"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Автомобиль"
                    name="carData.name"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Рег знак"
                    name="carData.number"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="VIN"
                    name="carData.vin"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Год выпуска"
                    name="carData.year"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пробег"
                    name="carData.km"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Перечень работ"
                    name="jobReason"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Предв. стоимость"
                    name="firstPrice"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Предв. дата выполн."
                    name="firstDateToDoneWork"
                    rules={[{required: true}]}
                >
                    <RangePicker
                        placeholder={["Дата начала", "Дата окончания работ"]}
                        language="ru-RU"
                        format={dateFormat}
                    />
                </Form.Item>

                <Form.Item
                    label="Сотрудник"
                    name="serviceman"
                    rules={[{required: true}]}
                    initialValue="Волк Дмитрий Иванович"
                >
                    <Input disabled={true} />
                </Form.Item>

                <div>
                    <Form.Item
                        label="Представитель"
                        name="customerRepresentative"
                        rules={[{required: true}]}
                    >
                        <Input />
                    </Form.Item>
                    <Button
                        onClick={
                            () => form.setFieldValue('customerRepresentative', form.getFieldValue('name'))
                        }
                    >
                        Представитель и заказчик совпадают
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default EditModal;