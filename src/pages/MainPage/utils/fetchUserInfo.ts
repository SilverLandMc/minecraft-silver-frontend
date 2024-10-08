import { PlayerInfoOutDto } from 'app/types/api/apiTypes';
import { AppThunkAction } from 'app/types/redux';
import { setUserInfo } from 'pages/MainPage/slices/mainPageSlice';
import createLogger from 'shared/lib/logger/logger';
import { request } from 'shared/lib/request/request';

const logger = createLogger('fetchUserNickname');

const fetchUserInfo =
    (userNickName: string): AppThunkAction =>
    async (dispatch) => {
        try {
            const playerInfo = await request<PlayerInfoOutDto>({
                url: `/public/player/${userNickName}`
            });
            dispatch(setUserInfo(playerInfo));
        } catch (error) {
            // Здесь ответ 404 при несуществующем игроке является ожидаемым
            logger.info(`fetchOnlineInfo: failed to fetch. Error: ${error}`);
            throw error;
        }
    };

export default fetchUserInfo;
