import { ProductCategory } from 'app/const/enum/ProductCategory';
import { ProductOutDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { request } from 'shared/lib/request/request';

const logger = createLogger('fetchAdminProductList');

const fetchAdminProductList = async (productCategory: ProductCategory) => {
    try {
        return await request<ProductOutDto[]>({ url: `/public/product/category/${productCategory}` });
    } catch (error) {
        const message = `fetchAdminProductList: failed to fetch. Error: ${error?.response?.data || error}`;
        logger.error(message);
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        throw error;
    }
};

export default fetchAdminProductList;
