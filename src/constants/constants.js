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
        value: 'Aozoom A15',
        label: 'Aozoom A15',
    },
    {
        value: 'Aozoom A5',
        label: 'Aozoom A5',
    },
    {
        value: 'Aozoom A3 pro',
        label: 'Aozoom A3 pro',
    },
    {
        value: 'Sunrise Mini',
        label: 'Sunrise Mini',
    },
    {
        value: 'Sunrise 2x2 WS-2',
        label: 'Sunrise 2x2 WS-2',
    },
    {
        value: 'Sunrise Chameleon White',
        label: 'Sunrise Chameleon White',
    },
    {
        value: 'Sunrise Chameleon Smart',
        label: 'Sunrise Chameleon Smart',
    },
    {
        value: 'Sunrise Racer',
        label: 'Sunrise Racer',
    },
    {
        value: 'Optima Alteza S',
        label: 'Optima Alteza S',
    },
    {
        value: 'Aozoom Truck Trailer 24V',
        label: 'Aozoom Truck Trailer 24V',
    },
    {
        value: 'клиентские',
        label: 'клиентские',
    },
];