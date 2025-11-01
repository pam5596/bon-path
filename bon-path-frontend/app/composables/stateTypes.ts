import type { VAlert } from 'vuetify/components';
import type { ServerError } from '~/models';

export interface STATE_TYPES {
    ALERT: {
        type: VAlert['type'],
        title: VAlert['title'],
        text: VAlert['text'],
        forDeveloper?: ServerError
    } | null;

    IS_LOADING: boolean;
}