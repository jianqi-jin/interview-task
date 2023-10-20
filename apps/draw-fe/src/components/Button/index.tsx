/**
 * @file Button
 * @author jjq
 * @description Button
 */

// import styles from './index.module.scss';

export enum BtnType {
  Primary = 'primary',
  Disable = 'disable',
  Secondly = 'secondly'
};

const typeClassMaps = {
  [BtnType.Secondly]: 'bg-blue-100 hover:bg-blue-200 text-blue-900 border',
  [BtnType.Disable]: 'btn-disabled',
  [BtnType.Primary]: 'bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white'
};

interface ButtonProps {
  type: `${BtnType}`;
  children: any;
  onClick: any;
};

const btnBase = 'inline-flex justify-center rounded-md border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';


const Button: React.FC<ButtonProps> = ({
  type,
  children,
  ...arg
}) => {
  return <button {...arg} className={`${btnBase} ${typeClassMaps[type]}`}>{children}</button>;
};

export default Button;