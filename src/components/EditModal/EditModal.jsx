import React from "react";
import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import {DATE_FORMAT, moduleOptions, servicemanOptions, warrantyOptions} from "../../constants/constants";

const EditModal = ({isModalOpen, setIsModalOpen, customerData, setCustomerData}) => {
    const [form] = useForm();

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
            discoveredFlaws: form.getFieldValue("discoveredFlaws"),
            valueJustification: form.getFieldValue("valueJustification"),
            fullPrice: form.getFieldValue("fullPrice"),
            workEnd: form.getFieldValue("workEnd")?.$d?.toLocaleDateString(),
            warranty: form.getFieldValue("warranty"),
            module: form.getFieldValue("module"),
        }))
        setIsModalOpen(false);
    }

    const cancelHandler = () => {
        form.resetFields();
        setIsModalOpen(false);
    }

    const {RangePicker} = DatePicker;

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
                    initialValue={customerData.requestNumber}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="ФИО"
                    name="name"
                    rules={[{required: true}]}
                    initialValue={customerData.name}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Телефон"
                    name="phone"
                    rules={[{required: true}]}
                    initialValue={customerData.phone || '+375'}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Автомобиль"
                    name="carData.name"
                    rules={[{required: true}]}
                    initialValue={customerData.carData.name}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Рег знак"
                    name="carData.number"
                    rules={[{required: true}]}
                    initialValue={customerData.carData.number}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="VIN"
                    name="carData.vin"
                    rules={[{required: true}]}
                    initialValue={customerData.carData.vin}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Год выпуска"
                    name="carData.year"
                    rules={[{required: true}]}
                    initialValue={customerData.carData.year}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Пробег"
                    name="carData.km"
                    rules={[{required: true}]}
                    initialValue={customerData.carData.km}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Перечень работ"
                    name="jobReason"
                    rules={[{required: true}]}
                    initialValue={customerData.jobReason}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Предв. стоимость"
                    name="firstPrice"
                    rules={[{required: true}]}
                    initialValue={customerData.firstPrice}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Предв. дата выполн."
                    name="firstDateToDoneWork"
                    rules={[{required: true}]}
                >
                    <RangePicker
                        placeholder={["Дата начала", "Дата окончания работ"]}
                        language="ru-RU"
                        format={DATE_FORMAT}
                    />
                </Form.Item>

                <Form.Item
                    label="Сотрудник"
                    name="serviceman"
                    rules={[{required: true}]}
                    initialValue={customerData.serviceman || servicemanOptions[0].value}
                >
                    <Select
                        placeholder="Сотрудник"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={servicemanOptions}
                    />
                </Form.Item>

                <div className="margin-bottom-20" style={{display: "flex", flexDirection: 'column'}}>
                    <Form.Item
                        label="Представитель"
                        name="customerRepresentative"
                        rules={[{required: true}]}
                        initialValue={customerData.customerRepresentative}
                    >
                        <Input/>
                    </Form.Item>
                    <Button
                        onClick={
                            () => form.setFieldValue('customerRepresentative', form.getFieldValue('name'))
                        }
                    >
                        Представитель и заказчик совпадают
                    </Button>
                </div>

                <Form.Item
                    label="Обнар. недостатки"
                    name="discoveredFlaws"
                    initialValue={customerData.discoveredFlaws}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Обосн. доб. стоимости"
                    name="valueJustification"
                    initialValue={customerData.valueJustification}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Итоговая стоимость"
                    name="fullPrice"
                    initialValue={customerData.fullPrice}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Дата окончания работ"
                    name="workEnd"
                >
                    <DatePicker
                        placeholder={["Дата окончания работ"]}
                        language="ru-RU"
                        format={DATE_FORMAT}
                    />
                </Form.Item>

                <Form.Item
                    label="Гарантия"
                    name="warranty"
                    initialValue={customerData.warranty}
                >
                    <Select
                        placeholder="Гарантия модулей"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={warrantyOptions}
                    />
                </Form.Item>

                <Form.Item
                    label="Модель модулей"
                    name="module"
                    initialValue={customerData.module}
                >
                    <Select
                        placeholder="Модель модулей"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={moduleOptions}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditModal;