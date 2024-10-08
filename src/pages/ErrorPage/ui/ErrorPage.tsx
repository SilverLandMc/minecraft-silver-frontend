import React, { FunctionComponent } from 'react';
import errorImage from 'shared/assets/troubledMan.png';
import Section from 'shared/ui/Section/Section';
import Spacing from 'shared/ui/spacing/Spacing';
import styles from './ErrorPage.module.scss';

export const ErrorPage: FunctionComponent = () => (
    <div className={styles.wrapper}>
        <Spacing size={15} sizeS={30} />

        <Section className={styles.section}>
            <img src={errorImage} className={styles.image} alt="Произошла ошибка" />
            <h3 className={styles.subheader}>Упс.</h3>
            <p className={styles.description}>
                Произошла ошибка. <br /> Попробуйте перезагрузить страницу или приходите к нам позднее.
            </p>
        </Section>

        <Spacing size={15} sizeS={30} />
    </div>
);
