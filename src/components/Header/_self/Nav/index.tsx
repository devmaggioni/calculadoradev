import { useState } from 'react';
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from 'react-icons/io';
import type { NavProps } from '../../types.ts';
import { MAX_VISIBLE_ITEMS } from '../../constants.ts';
import { Container, PrincipalMenu, AsideMenu } from './styles';

export default function Nav(props: NavProps) {
  const [currentItem, setCurrentItem] = useState<number | null>(null);

  const hasAsideMenu = props.items.length > MAX_VISIBLE_ITEMS;
  //const visibleItems = props.items.slice(0, MAX_VISIBLE_ITEMS - 1);
  const asideItems = props.items.slice(MAX_VISIBLE_ITEMS - 1);

  const handleItemClick = (index: number) => {
    setCurrentItem(index);
  };

  const renderAsideIcon = () => {
    const IconComponent = props.asideIsOpen
      ? IoMdArrowDropleftCircle
      : IoMdArrowDroprightCircle;

    return (
      <IconComponent
        onClick={props.handleAsideMenu}
        className='icon-minimize'
        aria-label={props.asideIsOpen ? 'Close aside menu' : 'Open aside menu'}
      />
    );
  };

  const renderMenuItem = (
    item: { text: string; url: string },
    index: number,
  ) => (
    <li
      key={index}
      className={index === currentItem ? 'current-item' : ''}
      onClick={() => handleItemClick(index)}
    >
      <IoMdArrowDroprightCircle className='icon' />
      {item.text}
    </li>
  );

  return (
    <Container theme={props.theme}>
      <PrincipalMenu
        hasMounted={props.hasMounted}
        mobileBreakPoint={props.mobileBreakPoint}
        menuIsOpen={props.menuIsOpen}
        asideIsOpen={props.asideIsOpen}
        theme={props.theme}
      >
        {props.items.map(renderMenuItem)}
      </PrincipalMenu>

      {hasAsideMenu && (
        <AsideMenu
          menuIsOpen={props.menuIsOpen}
          asideIsOpen={props.asideIsOpen}
          mobileBreakPoint={props.mobileBreakPoint}
          theme={props.theme}
        >
          {renderAsideIcon()}
          {asideItems.map((item, index) => (
            <li
              key={index + MAX_VISIBLE_ITEMS - 1}
              className={
                index + MAX_VISIBLE_ITEMS - 1 === currentItem
                  ? 'current-item'
                  : ''
              }
              onClick={() => handleItemClick(index + MAX_VISIBLE_ITEMS - 1)}
            >
              <IoMdArrowDroprightCircle className='icon' />
              {item.text}
            </li>
          ))}
        </AsideMenu>
      )}
    </Container>
  );
}
