import React from 'react';

const emptyData = '_________________';

const RequestPage = ({customerData}) => {
    return (
        <div id="printable">
            <div>
                Заявка № ПА-{
                customerData.dateRange[0]
                    ?.split('.').splice(0, 2)
                    ?.join('') || ''
                }-{customerData.requestNumber}
            </div>

            <div className="header">
                <div className="service-data">
                    <div>Исполнитель:</div>
                    <div>ИП Волк Дмитрий Иванович</div>
                    <div>УНП: 291388531</div>
                    <div>Юр. адрес: г. Белоозёрск, ул. Ленина 62/2 кв 1</div>
                    <div>Факт. адрес: г. Минск, Брилевский тупик 5 к4</div>
                    <div>Телефон: +375 (33) 66-55-44-9</div>
                </div>
                <div className="customer-data">
                    <div>Заказчик:</div>
                    <div>ФИО: {customerData.name || emptyData}</div>
                    <div>Телефон: {customerData.phone || emptyData}</div>
                </div>
            </div>

            <div>
                <div>Транспортное средство (ТС):</div>
                <table>
                    <thead>
                    <tr>
                        <td>Данные автомобиля</td>
                        <td>Регистрационный знак</td>
                        <td>VIN / заводской номер</td>
                        <td>Год выпуска</td>
                        <td>Пробег</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{customerData.carData.name}</td>
                        <td>{customerData.carData.number}</td>
                        <td>{customerData.carData.vin}</td>
                        <td>{customerData.carData.year}</td>
                        <td>{customerData.carData.km}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <div>Перечень работ, которые Заказчик просит произвести:</div>
                <div>(неисправности ТС, подлежащие устранению или описание этих неисправеностей)</div>
                <div>
                    {customerData.jobReason}
                    <hr/>
                    <hr/>
                </div>
            </div>

            <div>
                <div>Предварительная стоимость заказа:</div>
                <div>{customerData.firstPrice}</div>
            </div>

            <div>
                <div>Планируемая дата выполнения заказа:</div>
                <div>{customerData?.dateRange?.[1]}</div>
            </div>

            <div>
                <div>
                    Дополнительные работы, необходимость в которых может возникнуть в процессе исполнения Заказа, их
                    стоимость и сроки выполнения Исполнитель согласовывает с Заказчиком/Представителем устно и/или
                    письменно с последующим отражением в документе, подтверждающий факт выполненных работ.
                    Исполнитель не несёт ответственность за несоответствие параметрам гос. стандартов при
                    прохождении государственного технического осмотра.
                    Исполнитель имеет право на совершение фото и видео съёмки автомобиля с выездом в пределах 5км от
                    места проведения работ, при соблюдении техники безопасности и ПДД.
                </div>
            </div>

            <div>
                <div>Заявку оформил:</div>
                <div>
                    <div>{customerData.serviceman}</div>
                    <div></div>
                    <div>{customerData?.dateRange?.[0]}</div>
                </div>
                <div>
                    <div>Должность / ФИО сотрудника</div>
                    <div>подпись сотрудника</div>
                    <div>дата</div>
                </div>
            </div>

            <div>
                <div>Представитель заказчика</div>
                <div>Прошу принять ТС и произвести вышеперечисленные работы.</div>
                <div>
                    <div>{customerData.customerRepresentative}</div>
                    <div></div>
                    <div>{customerData?.dateRange?.[0]}</div>
                </div>
                <div>
                    <div>Заказчик / представитель</div>
                    <div>подпись заказчика</div>
                    <div>дата</div>
                </div>
            </div>
        </div>
    )
}

export default RequestPage;