import React from 'react';
import './RequestPage.css';
import {Table} from "antd";
import {emptyData, spaceForCredentions} from "../../utils/constants";
import {tableColumns} from "../../utils/tableColumns";

const RequestPage = ({customerData}) => {
    const tableDataSource = [
        {
            key: '1',
            carName: customerData.carData.name,
            number: customerData.carData.number,
            vin: customerData.carData.vin,
            year: customerData.carData.year,
            km: customerData.carData.km,
        },
    ];

    return (
        <div id="printableRequest">
            <div className="request-number">
                Заявка № ПА-{
                customerData.dateRange[0]
                    ?.split('.')
                    ?.join('') || ''
            }-{customerData.requestNumber}
            </div>

            <div className="header">
                <div className="service-data">
                    <div className="customer-worker">Исполнитель:</div>
                    <div className="bold">ИП Волк Дмитрий Иванович</div>
                    <div>УНП: 291388531</div>
                    <div>Юр. адрес: г. Белоозёрск, ул. Ленина 62/2 кв 1</div>
                    <div>Факт. адрес: г. Минск, Брилевский тупик 5 к4</div>
                    <div>Телефон: +375 (33) 66-55-44-9</div>
                </div>
                <div className="customer-data">
                    <div className="customer-worker">Заказчик:</div>
                    <div className="bold">ФИО: {customerData.name || emptyData}</div>
                    <div>Телефон: {customerData.phone || emptyData}</div>
                </div>
            </div>

            <div>
                <div className="bold biggest margin-bottom-10">Транспортное средство (ТС):</div>
                <Table
                    columns={tableColumns}
                    dataSource={tableDataSource}
                    pagination={false}
                    className="margin-bottom-20"
                />
            </div>

            <div>
                <div className="bold biggest">Перечень работ, которые Заказчик просит произвести:</div>
                <div className="bold margin-bottom-10 font-size-12">(неисправности ТС, подлежащие устранению или
                    описание этих неисправеностей)
                </div>
                <div>
                    <div className="margin-bottom-20">{customerData.jobReason}</div>
                </div>
            </div>

            <div className="price-date padding-x-10">
                <div className="bold biggest margin-bottom-20">Предварительная стоимость заказа:</div>
                <div className="bold biggest margin-bottom-20">{customerData.firstPrice || 0} бел. руб.</div>
            </div>

            <div className="price-date padding-x-10">
                <div className="bold biggest margin-bottom-20">Планируемая дата выполнения заказа:</div>
                <div className="bold biggest margin-bottom-20">{customerData?.dateRange?.[1] || 'не задано'}</div>
            </div>

            <div>
                Дополнительные работы, необходимость в которых может возникнуть в процессе исполнения Заказа, их <br />
                стоимость и сроки выполнения Исполнитель согласовывает с Заказчиком/Представителем устно и/или <br />
                письменно с последующим отражением в документе, подтверждающий факт выполненных работ. <br />
                Исполнитель не несёт ответственность за несоответствие параметрам гос. стандартов при <br />
                прохождении государственного технического осмотра. <br />
                Исполнитель имеет право на совершение фото и видео съёмки автомобиля с выездом в пределах 5км от <br />
                места проведения работ, при соблюдении техники безопасности и ПДД.
            </div>

            <div>
                Клиент обязуется забрать автомобиль в течение 24 часов с момента уведомления о завершении работ (по телефону, SMS, email или иным способом). <br/>
                Плата за хранение: В случае, если клиент не забирает автомобиль в указанный срок, взимается плата за хранение в размере 15 белорусских рублей в день.<br/>
                Мастерская не несёт материальной ответственности за повреждения, произошедшие на парковке (ДТП, угоны, стихийные бедствия и иные внешние воздействия).<br/>
                Клиент принимает на себя все риски, связанные с дальнейшим хранением автомобиля на территории мастерской.
            </div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <div className="bold biggest margin-bottom-10">Заявку оформил:</div>
            <div className="final-req">
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>{customerData.serviceman}</div>
                    <div>{spaceForCredentions} БП</div>
                    <div>{customerData?.dateRange?.[0]}</div>
                </div>
            </div>

            <div>
                <div className="biggest bold margin-bottom-10">Представитель заказчика</div>
                <div>Прошу принять ТС и произвести вышеперечисленные работы.</div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>{customerData.customerRepresentative}</div>
                    <div>{spaceForCredentions}</div>
                    <div>{customerData?.dateRange?.[0]}</div>
                </div>
            </div>
        </div>
    )
}

export default RequestPage;