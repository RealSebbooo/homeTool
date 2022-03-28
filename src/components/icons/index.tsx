import theme from '@ab-core/variables';
import React, { FC } from 'react';
import { Iconsizer } from './styled';
import { AbakusIcon } from './svgs/abakus';
import { AbakusPlusIcon } from './svgs/abakusPlus';
import { AccountIcon } from './svgs/account';
import { ArrowRightIcon } from './svgs/arrowRight';
import { ArrowLeftIcon } from './svgs/arrowLeft';
import { ArrowRightThinIcon } from './svgs/arrowRightThin';
import { AvailableIcon } from './svgs/available';
import { BasketIcon } from './svgs/basket';
import { BurgerIcon } from './svgs/burger';
import { CalculatorIcon } from './svgs/calculator';
import { ChatIcon } from './svgs/chat';
import { CheckCircledIcon } from './svgs/checkCircled';
import { ChevronDownIcon } from './svgs/chevronDown';
import { ChevronLeftIcon } from './svgs/chevronLeft';
import { ChevronUpIcon } from './svgs/chevronUp';
import { CloseIcon } from './svgs/close';
import { ConfirmIcon } from './svgs/confirm';
import { CreditsIcon } from './svgs/credits';
import { DateIcon } from './svgs/date';
import { DownloadIcon } from './svgs/download';
import { EditIcon } from './svgs/edit';
import { ErrorIcon } from './svgs/error';
import { EyeIcon } from './svgs/eye';
import { FacebookIcon } from './svgs/facebook';
import { FactoryIcon } from './svgs/factory';
import { FilterIcon } from './svgs/filter';
import { GridIcon } from './svgs/grid';
import { HouseIcon } from './svgs/house';
import { InfoIcon } from './svgs/info';
import { InstagramIcon } from './svgs/instagram';
import { LanguageIcon } from './svgs/language';
import { LinkedinIcon } from './svgs/linkedin';
import { ListIcon } from './svgs/list';
import { LoaderIcon } from './svgs/loader';
import { Loading } from './svgs/loading';
import { LogoutIcon } from './svgs/logout';
import { MessageIcon } from './svgs/message';
import { MyListIcon } from './svgs/myList';
import { MyOrderIcon } from './svgs/myOrder';
import { NostockIcon } from './svgs/nostock';
import { OfferIcon } from './svgs/offer';
import { PlusIcon } from './svgs/plus';
import { PricesPromotionIcon } from './svgs/pricespromotion';
import { PrintIcon } from './svgs/print';
import { ProcuredIcon } from './svgs/procured';
import { ProfilIcon } from './svgs/profil';
import { ReceiptIcon } from './svgs/receipt';
import { ScalePriceIcon } from './svgs/scaleprice';
import { ScalePriceIconFilled } from './svgs/scalepricefilled';
import { SearchIcon } from './svgs/search';
import { StrokedOutCircle } from './svgs/strokedOutCircle';
import { TecselectIcon } from './svgs/tecselect';
import { TrashIcon } from './svgs/trash';
import { TwitterIcon } from './svgs/twitter';
import { WarningIcon } from './svgs/warning';
import { XingIcon } from './svgs/xing';
import { YoutubeIcon } from './svgs/youtube';
import { PuzzleIcon } from './svgs/puzzle';
import { RotatingArrowIcon } from './svgs/rotatingArrow';
import { RevertClockIcon } from './svgs/revertClock';
import { PromotionPriceIcon } from './svgs/promotionprice';
import { PriceCalculation } from './svgs/priceCalculation';
import { SpecialArticle } from './svgs/specialArticle';
import { CheckedFilled } from './svgs/checkedFilled';
import { Circle } from './svgs/circle';
import { DownloadCloud } from './svgs/downloadCloud';
import { CableReel } from './svgs/cableReel';
import { ReturnIcon } from './svgs/return';
import { CheckedUnfilled } from './svgs/checkedUnfilled';

export type IconProps = {
    //* * Icon Name */
    name?: string;
    //* * SVG Fill Color */
    color?: string;
    /** @deprecated use size instead */
    small?: boolean;
    //* *  onClick Event  */
    onClick?: () => void;
    //* *  prop from styled components  */
    className?: string;
    // Tiny Small Regular
    size?: IconSizes;
    ready?: boolean;
    progress?: boolean;
    title?: string;
};

export enum IconSizes {
    Tiny = '12px',
    Small = '16px',
    Regular = '20px'
}

export type IconTagProps = {
    height?: string;
    fill?: string;
    viewBox?: string;
    xmlns?: string;
    color?: string;
    filter?: string;
    style?: string;
    clipPath?: string;
    mask?: string;
    path?: string;
    small?: boolean;
    size?: IconSizes;
    progress?: boolean;
    ready?: boolean;
    title?: string;
};

export const Icons = {
    calculator: CalculatorIcon,
    basket: BasketIcon,
    arrowRight: ArrowRightIcon,
    arrowLeft: ArrowLeftIcon,
    arrowRightThin: ArrowRightThinIcon,
    loader: LoaderIcon,
    burger: BurgerIcon,
    account: AccountIcon,
    list: ListIcon,
    circle: Circle,
    close: CloseIcon,
    download: DownloadIcon,
    language: LanguageIcon,
    grid: GridIcon,
    message: MessageIcon,
    print: PrintIcon,
    search: SearchIcon,
    filter: FilterIcon,
    chevronUp: ChevronUpIcon,
    chevronDown: ChevronDownIcon,
    chevronLeft: ChevronLeftIcon,
    profil: ProfilIcon,
    logout: LogoutIcon,
    chat: ChatIcon,
    available: AvailableIcon,
    nostock: NostockIcon,
    procured: ProcuredIcon,
    trash: TrashIcon,
    info: InfoIcon,
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    youtube: YoutubeIcon,
    linkedin: LinkedinIcon,
    xing: XingIcon,
    instagram: InstagramIcon,
    factory: FactoryIcon,
    house: HouseIcon,
    loading: Loading,
    check: CheckCircledIcon,
    checkedFilled: CheckedFilled,
    notChecked: StrokedOutCircle,
    date: DateIcon,
    tecselect: TecselectIcon,
    abakus: AbakusIcon,
    abakusPlus: AbakusPlusIcon,
    credits: CreditsIcon,
    myList: MyListIcon,
    myOrder: MyOrderIcon,
    offer: OfferIcon,
    eye: EyeIcon,
    edit: EditIcon,
    plus: PlusIcon,
    scaleprice: ScalePriceIcon,
    scaleprices: ScalePriceIconFilled,
    pricespromotion: PricesPromotionIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    confirm: ConfirmIcon,
    puzzle: PuzzleIcon,
    rotatingArrow: RotatingArrowIcon,
    revertClock: RevertClockIcon,
    receipt: ReceiptIcon,
    promotionprice: PromotionPriceIcon,
    pricecalculation: PriceCalculation,
    specialArticle: SpecialArticle,
    downloadCloud: DownloadCloud,
    cableReel: CableReel,
    return: ReturnIcon,
    checkedUnfilled: CheckedUnfilled
};

const Icon: FC<IconProps> = ({
    name = 'loading',
    color = 'gray3',
    small = false,
    onClick,
    className,
    size = small ? IconSizes.Small : IconSizes.Regular,
    ready,
    progress,
    title
}) => {
    // @TODO use Typscript enum

    const IconTag = Icons[name as keyof typeof Icons];
    if (!IconTag) {
        return null;
    }
    let fill = color.startsWith('#') ? color : (theme[color as keyof typeof theme] as string);
    fill = fill || theme.black;

    return (
        <Iconsizer className={className} small={small} size={size} onClick={onClick}>
            <IconTag fill={fill} small={small} size={size} ready={ready} progress={progress} title={title} />
        </Iconsizer>
    );
};
export default Icon;
