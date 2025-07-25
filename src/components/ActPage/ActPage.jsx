import React from 'react';
import './ActPage.css';
import {emptyData, spaceForCredentions} from "../../utils/constants";

const ActPage = ({customerData}) => {

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
                <div>
                    { customerData?.carData?.name && <span><b>Автомобиль:</b> {customerData?.carData?.name}, </span> }
                    { customerData?.carData?.number && <span><b>гос. номер:</b> {customerData?.carData?.number}, </span> }
                    { customerData?.carData?.vin && <span><b>VIN:</b> {customerData?.carData?.vin}, </span> }
                    { customerData?.carData?.year && <span><b>год. вып.:</b> {customerData?.carData?.year}, </span> }
                    { customerData?.carData?.km && <span><b>пробег:</b> {customerData?.carData?.km}</span> }
                </div>
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
                <div>
                    <span className="bold biggest margin-bottom-10">Обнаруженные недостатки: </span>
                    {customerData.discoveredFlaws || ''}
                </div>
            </div>

            <div>
                <div>
                    <span className="bold biggest margin-bottom-10">Обоснование добавленной стоимости: </span>
                    {customerData.valueJustification || ''}
                </div>
            </div>

            <div>
                <div>
                    <span className="bold biggest margin-bottom-10">Итоговая стоимость заказа: </span>
                    {customerData.fullPrice || ''} бел. руб.
                </div>
            </div>

            <div>
                <div>
                    <span className="bold biggest margin-bottom-10">Дата окончания работ: </span>
                    {customerData.workEnd || ''}
                </div>
            </div>

            <div>
                <div className="bold biggest margin-bottom-10">Гарантийные обязательства:</div>
                <div>
                    Претензии не принимаются в случае не соблюдения заказчиком правил технической эксплуатации,
                    дорожно-транспортного происшествия, при ремонте установленного агрегата, узла, детали, без
                    предъявления ТС на предприятие автосервиса, а также в случае предъявления
                    претензий после установленного срока. Гарантийный срок начинает исчисляться со дня приёмки
                    потребителем ТС или агрегата. Предприятие не устанавливает гарантии на запчасти
                    предоставленные заказчиком для ремонта. Претензии по качеству и объему выполненных услуг по
                    обслуживанию могут быть предъявлены заказчиком в течении следующих гарантийных сроков: <br/>
                    - работы проведённые по доработке узла фар ТС - в течение 365 дней при пробеге не более 50000
                    км; <br/>
                    {
                        customerData?.module && (
                            <div>
                                - установленные модули в фары ТС – {customerData.warranty || '-'} <br />
                                Модель модулей, установленных в фару ТС: – {customerData.module || 'не устанавливался'}
                            </div>
                        )
                    }

                    Для действия гарантии фара должна соответствовать заводским параметрам герметичности. <br/>
                    При любом ДТП необходимо явиться к исполнителю для диагностики повреждений фар. <br/>
                    При несоответствии фары эксплуатационным характеристикам, не связанными с работой Исполнителя,
                    необходимо в срок до 14 дней исправить все имеющиеся недостатки и предоставить доказательства
                    исправления исполнителю.
                </div>

                <br />
                <br />
                <br />
                <br />

                <div>
                    С объёмом работ согласен(на), перечень работ понятен, претензий к выполненным работам и состоянию <br />
                    ТС (как с внешней, так и с внутренней стороны) не имею, все работы приняты мною в полном объёме, качество мною
                    проверено; само транспортное средство, ключи от него и документы на ТС от Подрядчика получила(а); с
                    правилами оказания услуг по ремонту ТС согласно СТБ 1175-2011 ознакомлен(а), содержание мне понятно.
                    Гарантийные обязательства на работы выполняются исполнителем только при предъявлении ТС, акта
                    выполненных работ на проведённые работы и техпаспорта (доверенности). ТС - транспортное средство, автомобиль.
                </div>
                <br />
            </div>

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
                    <div>Мастер {customerData.serviceman}</div>
                    <div>{spaceForCredentions} БП</div>
                    <div>{customerData?.dateRange?.[1]}</div>
                </div>
            </div>

            <div>
                <div className="biggest bold margin-bottom-10">Заказчик (представитель)</div>
                <div>ТС принял, с условиями и обязанностями ознакомлен.</div>
                <br />
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