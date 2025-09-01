import React, { useEffect } from "react";
import {Button, DatePicker, Form, Image, Input, Modal, Progress, Select, Typography} from "antd";
import {useForm} from "antd/es/form/Form";
import {DATE_FORMAT, moduleOptions, servicemanOptions, warrantyOptions} from "../../constants/constants";
import duckImage from "../../assets/duck.png";
import porscheFirst from '../../assets/porsche911.png';
import unicorn from '../../assets/unicorn.png';

const EditModal = ({isModalOpen, setIsModalOpen, customerData, setCustomerData}) => {
    const [form] = useForm();

    const {TextArea} = Input;

    useEffect(() => {
        if (isModalOpen && customerData) {
            form.setFieldsValue({
                name: customerData.name,
                phone: customerData.phone || '+375',
                'carData.name': customerData.carData?.name,
                'carData.number': customerData.carData?.number,
                'carData.year': customerData.carData?.year,
                'carData.km': customerData.carData?.km,
                jobReason: customerData.jobReason,
                firstPrice: customerData.firstPrice,
                serviceman: customerData.serviceman || servicemanOptions[0]?.value,
                customerRepresentative: customerData.customerRepresentative,
                discoveredFlaws: customerData.discoveredFlaws,
                valueJustification: customerData.valueJustification,
                fullPrice: customerData.fullPrice,
                warranty: customerData.warranty,
                module: customerData.module,
            });
        }
    }, [customerData, isModalOpen, form]);

    const okHandler = () => {
        setCustomerData((prevState) => ({
            ...prevState,
            name: form.getFieldValue("name"),
            phone: form.getFieldValue("phone"),
            carData: {
                name: form.getFieldValue("carData.name"),
                number: form.getFieldValue("carData.number"),
                year: form.getFieldValue("carData.year"),
                km: form.getFieldValue("carData.km"),
            },
            jobReason: form.getFieldValue("jobReason"),
            firstPrice: form.getFieldValue("firstPrice"),
            serviceman: form.getFieldValue("serviceman"),
            customerRepresentative: form.getFieldValue("customerRepresentative"),
            discoveredFlaws: form.getFieldValue("discoveredFlaws"),
            valueJustification: form.getFieldValue("valueJustification"),
            fullPrice: form.getFieldValue("fullPrice"),
            workEnd: form.getFieldValue("workEnd")?.$d?.toLocaleDateString(),
            warranty: form.getFieldValue("warranty"),
            module: form.getFieldValue("module"),
        }));
        setIsModalOpen(false);
    }

    const cancelHandler = () => {
        form.resetFields();
        setIsModalOpen(false);
    }

    return (
        <Modal
            open={isModalOpen}
            onOk={() => okHandler()}
            onCancel={() => cancelHandler()}
        >
            <div style={{position: "absolute", top: '-60px', right: '-70px', rotate: '20deg'}}>
                <Image src={duckImage} width={80} height={80} preview={false}/>
            </div>
            <div style={{position: "absolute", top: '-60px', left: '-70px', rotate: '0deg'}}>
                <Image src={unicorn} width={80} height={80} preview={false}/>
            </div>
            <div style={{position: "absolute", top: '-110px', left: '42%', rotate: '0deg'}}>
                <Image src={porscheFirst} width={120} preview={false}/>
            </div>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 800}}
                initialValues={{remember: true}}
                autoComplete="true"
                form={form}
            >
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30, marginBottom: "30px" }}>
                    <Typography style={{ fontFamily: "Inter, sans-serif", fontSize: "20px" }}>Собираем Диане на 911</Typography>
                    <Progress type="circle" percent={1} size={40}/>
                </div>
                <Form.Item
                    label="ФИО"
                    name="name"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Телефон"
                    name="phone"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Автомобиль"
                    name="carData.name"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Рег знак"
                    name="carData.number"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Год выпуска"
                    name="carData.year"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Пробег"
                    name="carData.km"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Перечень работ"
                    name="jobReason"
                    rules={[{required: true}]}
                >
                    <TextArea rows={3}/>
                </Form.Item>

                <Form.Item
                    label="Предв. стоимость"
                    name="firstPrice"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Сотрудник"
                    name="serviceman"
                    rules={[{required: true}]}
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
                >
                    <TextArea rows={3}/>
                </Form.Item>

                <Form.Item
                    label="Обосн. доб. стоимости"
                    name="valueJustification"
                >
                    <TextArea rows={3}/>
                </Form.Item>

                <Form.Item
                    label="Итоговая стоимость"
                    name="fullPrice"
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