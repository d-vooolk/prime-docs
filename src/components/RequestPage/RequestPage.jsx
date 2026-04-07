import React from 'react';
import './RequestPage.css';
import {Table} from "antd";
import {emptyData, spaceForCredentions} from "../../utils/constants";
import {tableColumns} from "../../utils/tableColumns";
import {SERVICE_OPTIONS_NAMES} from "../../constants/constants";
import {HeadlightRequestDescription} from "./Descriptions/HeadlightRequestDescription";
import {TonerRequestDescription} from "./Descriptions/TonerRequestDescription";
import {CleaningRequestDescription} from "./Descriptions/CleaningRequestDescription";

const RequestPage = ({customerData, date, serviceOption}) => {
    const tableDataSource = [
        {
            key: '1',
            carName: customerData.carData.name,
            number: customerData.carData.number,
            year: customerData.carData.year,
            km: customerData.carData.km,
        },
    ];

    return (
        <div id="printableRequest">
            <div className="request-number">
                Заявка № ПА-{
                date
                    ?.split('.')
                    ?.join('') || ''
            }-{customerData?.randomFileCode} от {date}
            </div>

            <div className="header">
                <div className="service-data">
                    <div className="customer-worker">Исполнитель:</div>
                    <div className="bold">ООО "Первый Автосвет"</div>
                    <div>УНП: 193897412</div>
                    <div>Юр. адрес: Минск, Брилевский тупик 5</div>
                    <div>Факт. адрес: Минск, Брилевский тупик 5</div>
                    <div>Телефон: +375 (33) 66-55-44-9</div>
                </div>
                <div className="customer-data">
                    <div className="customer-worker">Заказчик:</div>
                    <div className="bold">Собственник: {customerData?.name || emptyData}</div>
                    {
                        customerData?.name !== customerData?.customerRepresentative
                        && (
                            <div className="bold">Представитель: {customerData?.customerRepresentative || emptyData}</div>
                        )
                    }
                    <div>Телефон: {customerData?.phone || emptyData}</div>
                </div>
            </div>

            <div>
                <div className="bold biggest margin-bottom-10">Транспортное средство (ТС):</div>
                <Table
                    columns={tableColumns}
                    dataSource={tableDataSource}
                    pagination={false}
                    className="margin-bottom-20"
                    style={{ zIndex: 0 }}
                />
                <br />
            </div>

            <div>
                <div className="bold biggest">Перечень работ, которые Заказчик просит произвести:</div>
                <div className="bold margin-bottom-10 font-size-12">(неисправности ТС, подлежащие устранению или
                    описание этих неисправеностей)
                </div>
                <div>
                    <div className="margin-bottom-20">{customerData?.jobReason}</div>
                </div>
            </div>

            <div className="price-date padding-x-10">
                <div className="bold biggest margin-bottom-20">Предварительная стоимость заказа:</div>
                <div className="bold biggest margin-bottom-20">{customerData?.firstPrice || 0} бел. руб.</div>
            </div>

            { serviceOption === SERVICE_OPTIONS_NAMES.headlights && (<HeadlightRequestDescription />) }
            { serviceOption === SERVICE_OPTIONS_NAMES.toner && (<TonerRequestDescription />) }
            { serviceOption === SERVICE_OPTIONS_NAMES.cleaning && (<CleaningRequestDescription />) }

            <div className="bold biggest">Заявку оформил:</div>
            <div className="final-req">
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>Мастер-приёмщик {customerData.serviceman}</div>
                    <div>{spaceForCredentions} МП</div>
                    <div>{date}</div>
                </div>
            </div>

            <div>
                <div className="biggest bold margin-bottom-10">Представитель заказчика</div>
                <div>Прошу принять ТС и произвести вышеперечисленные работы. <br /> С условиями и обязанностями ознакомлен.</div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>{customerData?.customerRepresentative}</div>
                    <div>{spaceForCredentions}</div>
                    <div>{date}</div>
                </div>
            </div>
        </div>
    )
}

export default RequestPage;