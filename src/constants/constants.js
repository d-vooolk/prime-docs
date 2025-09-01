export const MODE_OPTIONS = [
    {
        label: 'Заявка',
        value: 'request',
    },
    {
        label: 'Акт',
        value: 'act',
    },
];

export const FILE_EXTENTION = '.json';

export const PRINT_SETTINGS = {
    type: 'html',
    targetStyles: ['*'],
    showModal: true,
    header: null,
    footer: null,
};

export const DEFAULT_CUSTOMER_DATA = {
    name: '',
    phone: '',
    carData: {
        name: '',
        number: '',
        year: '',
        km: '',
    },
    jobReason: '',
    firstPrice: '',
    serviceman: '',
    customerRepresentative: '',

    discoveredFlaws: '',
    valueJustification: '',
    fullPrice: '',
    workEnd: '',
    warranty: '',
    module: '',
}

export const DATE_FORMAT = 'DD-MM-YYYY';

export const servicemanOptions = [
    {
        value: "Белоус Диана Петровна",
        label: "Белоус Диана Петровна"
    },
    {
        value: "Волк Дмитрий Иванович",
        label: "Волк Дмитрий Иванович"
    },
]

export const warrantyOptions = [
    {
        value: '1 год',
        label: '1 год',
    },
    {
        value: 'без гарантии',
        label: 'без гарантии',
    },
];

export const moduleOptions = [
    {
        value: 'Vision Advance',
        label: 'Vision Advance',
    },
    {
        value: 'Vision Ultimate',
        label: 'Vision Ultimate',
    },
    {
        value: 'Sanvi F50',
        label: 'Sanvi F50',
    },
    {
        value: 'Aozoom A6+',
        label: 'Aozoom A6+',
    },
    {
        value: 'Aozoom DK200',
        label: 'Aozoom DK200',
    },
    {
        value: 'Sunrise Mini',
        label: 'Sunrise Mini',
    },
    {
        value: 'UPS Maker',
        label: 'UPS Maker',
    },
    {
        value: 'клиентские',
        label: 'клиентские',
    },
];