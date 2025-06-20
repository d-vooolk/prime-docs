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
    requestNumber: '',
    name: '',
    phone: '',
    carData: {
        name: '',
        number: '',
        vin: '',
        year: '',
        km: '',
    },
    jobReason: '',
    firstPrice: '',
    dateRange: '',
    serviceman: '',
    requestDate: '',
    customerRepresentative: '',

    discoveredFlaws: '',
    valueJustification: '',
    fullPrice: '',
    workEnd: '',
    warranty: '',
    module: '',
}