import React from 'react';
import './ActPage.css';
import {Table} from "antd";
import {tableColumns} from "../../utils/tableColumns";

const emptyData = '_________________';
const spaceForCredentions = '_________________________';

const ActPage = ({customerData}) => {
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
        <div id="printableAct">
            <div className="request-number">
                Акт выполненных работ № ПА-{
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
                <br />
            </div>

            <div>
                <div className="bold biggest">Перечень работ, которые Заказчик просил произвести:</div>
                <div className="margin-bottom-10 font-size-12">(неисправности ТС, подлежащие устранению или
                    описание этих неисправеностей)
                </div>
                <div>
                    <div>{customerData.jobReason}</div>
                </div>
                <br />
            </div>

            <div>
                <div className="bold biggest margin-bottom-10">Обнаруженные недостатки:</div>
                <div>{customerData.discoveredFlaws || ''}</div>
            </div>

            <div>
                <div className="bold biggest margin-bottom-10">Обоснование добавленной стоимости:</div>
                <div>{customerData.valueJustification || ''}</div>
            </div>

            <div>
                <div className="bold biggest margin-bottom-10">Итоговая стоимость заказа:</div>
                <div>{customerData.fullPrice || ''} бел. руб.</div>
            </div>

            <div>
                <div className="bold biggest margin-bottom-10">Гарантийные обязательства:</div>
                <div>
                    Претензии не принимаются в случае не соблюдения заказчиком правил технической эксплуатации,
                    дорожно-транспортного происшествия, при ремонте установленного агрегата, узла, детали, без
                    предъявления автотранспортного средства на предприятие автосервиса, а также в случае предъявления
                    претензий после установленного срока. Гарантийный срок начинает исчисляться со дня приёмки
                    потребителем транспортного средства или агрегата. Предприятие не устанавливает гарантии на запчасти
                    предоставленные заказчиком для ремонта. Претензии по качеству и объему выполненных услуг по
                    обслуживанию могут быть предъявлены заказчиком в течении следующих гарантийных сроков: <br/>
                    - работы проведённые по доработке узла фар ТС - в течение 365 дней при пробеге не более 50000
                    км; <br/>
                    {
                        customerData?.module && (
                            `
                                - установленные модули в фары ТС – ${customerData.warranty || '-'} <br/>
                                Модель модулей, установленных в фару ТС: – ${customerData.module || 'не устанавливался'} <br/>
                            `
                        )
                    }

                    Для действия гарантии фара должна соответствовать заводским параметрам герметичности. <br/>
                    При любом ДТП необходимо явиться к исполнителю для диагностики повреждений фар. <br/>
                    При несоответствии фары эксплуатационным характеристикам, не связанными с работой Исполнителя,
                    необходимо в срок до 14 дней исправить все имеющиеся недостатки и предоставить доказательства
                    исправления исполнителю.
                </div>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <div className="bold biggest margin-bottom-10">Контроль полноты, качества работ, комплектность и проверку
                технического состояния автомобиля произвёл:
            </div>
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
                    <div>{customerData?.dateRange?.[1]}</div>
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
                    <div>{customerData?.dateRange?.[1]}</div>
                </div>
            </div>
        </div>
    )
}

export default ActPage;