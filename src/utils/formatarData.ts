import * as moment from 'moment';

export function formatarData(timestamp: string | undefined) {
    if (timestamp) {
        return moment.unix(parseInt(timestamp, 10)).format('DD/MM/YYYY HH:mm');
    }
    return null;
}