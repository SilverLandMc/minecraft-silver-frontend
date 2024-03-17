import React, { FunctionComponent, useContext, useState } from 'react';
import ShoppingListTable from 'features/ShoppingListTable/ShoppingListTable';
import PromoCodeBlock from 'features/PromoCodeBlock/PromoCodeBlock';
import Button from 'shared/ui/Button/Button';
import PlayerInfoBlock from 'features/playerInfoBlock/PlayerInfoBlock';
import { useSelector } from 'react-redux';
import selectPlayerName from 'shared/redux/selectors/selectPlayerName';
import { AppContext } from 'app/providers/AppContextProvider';
import { erasePlayerInfo } from 'pages/MainPage/slices/mainPageSlice';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import { CreatePaymentDto } from 'app/types/api/apiTypes';
import createPayment from 'widgets/ShoppingList/utils/createPayment';
import styles from './ShoppingListWithProducts.module.scss';

const ShoppingListWithProducts: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const [isPaymentCreating, setIsPaymentCreating] = useState(false);
    const [paymentError, setPaymentError] = useState(undefined);

    const playerName = useSelector(selectPlayerName);
    const { productsToBuy, promoCode, setPromoCode } = useContext(AppContext);

    const handlePayment = async () => {
        if (!playerName || !productsToBuy || productsToBuy.length === 0) {
            return;
        }

        const paymentInfo: CreatePaymentDto = {
            playerName,
            productList: productsToBuy.map(({ id, amount }) => {
                return {
                    id,
                    amount
                };
            }),
            promocode: promoCode?.name ?? null
        };

        try {
            setIsPaymentCreating(true);
            await createPayment(paymentInfo);
            setPaymentError(undefined);
        } catch (error) {
            setPaymentError('Что-то пошло не так. Попробуйте перезагрузить страницу');
        } finally {
            setIsPaymentCreating(false);
        }
    };

    const logout = () => {
        dispatch(erasePlayerInfo());
        setPromoCode(undefined);
    };

    return (
        <>
            <h2 className={styles.header}>Ваша корзина:</h2>

            <ShoppingListTable />

            {playerName ? (
                <div className={styles.buyBlockWrapper}>
                    <PromoCodeBlock disabled={isPaymentCreating} />

                    <div className={styles.playerNameLogoutWrapper}>
                        <Button className={styles.button} onClick={handlePayment} disabled={isPaymentCreating}>
                            Купить для
                            <span className={styles.playerNameSpan}>{playerName}</span>
                        </Button>

                        <Button className={styles.logoutButton} onClick={logout} disabled={isPaymentCreating}>
                            Выйти
                        </Button>
                    </div>

                    {Boolean(paymentError) && <span className={styles.errorSpan}>{paymentError}</span>}
                </div>
            ) : (
                <PlayerInfoBlock className={styles.playerInfoBlock} title="Введите ник игрока, чтобы купить товары:" />
            )}
        </>
    );
};

export default ShoppingListWithProducts;
