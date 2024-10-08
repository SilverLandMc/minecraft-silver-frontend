import React, { FunctionComponent, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes as AppRoute, RoutePath } from 'shared/config/routeConfig/routeConfig';
import classNames from 'shared/lib/aliases/classNames';
import boostersIcon from './images/boostersIcon.png';
import chestsIcon from './images/chestsIcon.png';
import homeIcon from './images/homeIcon.png';
import ranksIcon from './images/ranksIcon.png';
import resourcesIcon from './images/resourcesIcon.png';
import styles from './NavBar.module.scss';

interface Props {
    onClose?(event: MouseEvent): void;
    closing?: boolean;
}

type NavBarLink = { icon: string; verboseName: string };

const navBarLinks: Partial<Record<AppRoute, NavBarLink>> = {
    [AppRoute.MAIN]: { icon: homeIcon, verboseName: 'Главная' },
    [AppRoute.RANKS]: { icon: ranksIcon, verboseName: 'Ранги' },
    [AppRoute.BOOSTERS]: { icon: boostersIcon, verboseName: 'Бустеры' },
    [AppRoute.CASES]: { icon: chestsIcon, verboseName: 'Сундуки' },
    [AppRoute.RESOURCES]: { icon: resourcesIcon, verboseName: 'Ресурсы' }
};

const NavBar: FunctionComponent<Props> = ({ onClose, closing: isClosing }) => {
    const currentPath = useLocation().pathname;

    return (
        <div className={classNames(styles.navBar, { [styles.isClosing]: isClosing })}>
            {Object.entries(navBarLinks).map(([appRoute, { icon, verboseName }]) => (
                <div key={appRoute} className={styles.linkContainer}>
                    <div className={styles.iconContainer}>
                        <img src={icon} className={styles.icon} alt={verboseName} />
                    </div>

                    <Link
                        to={RoutePath[appRoute as AppRoute]}
                        className={classNames(styles.link, {
                            [styles.isActive]: currentPath === RoutePath[appRoute as AppRoute]
                        })}
                        onClick={onClose}
                    >
                        {verboseName}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default NavBar;
