import { GET_MENU_LIST, ADD_MENU, UPDATE_MENU, REMOVE_MENU } from "./constants";

const initMenuList = [];

function addMenu(menuList, menu) {
  for (let i = 0; i < menuList.length; i++) {
    const item = menuList[i];
    if (item._id === menu.pid) {
      if (item.children) {
        item.children.push(menu);
      } else {
        item.children = [menu];
      }
      return menuList;
    }
    if (item.children) {
      const result = addMenu(item.children, menu);
      if (result) return menuList;
    }
  }
}

function updateMenu(menuList, permission) {
  for (let i = 0; i < menuList.length; i++) {
    const menu = menuList[i];
    if (menu._id === permission._id) {
      menuList[i] = {
        ...permission,
        children: menu.children,
      };
      return menuList;
    }
    if (menu.children) {
      updateMenu(menu.children, permission);
    }
  }
  return menuList;
}

function removeMenu(menuList, id) {
  for (let i = 0; i < menuList.length; i++) {
    const menu = menuList[i];
    if (menu._id === id) {
      menuList.splice(i, 1);
      return menuList;
    }
    if (menu.children) {
      removeMenu(menu.children, id);
    }
  }
  return menuList;
}

export default function menuList(prevState = initMenuList, action) {
  let menuList = null;
  switch (action.type) {
    case GET_MENU_LIST:
      return action.data;
    case ADD_MENU:
      menuList = JSON.parse(JSON.stringify(prevState));
      return addMenu(menuList, action.data);
    case UPDATE_MENU:
      menuList = JSON.parse(JSON.stringify(prevState));
      return updateMenu(menuList, action.data);
    case REMOVE_MENU:
      menuList = JSON.parse(JSON.stringify(prevState));
      return removeMenu(menuList, action.data);
    default:
      return prevState;
  }
}
