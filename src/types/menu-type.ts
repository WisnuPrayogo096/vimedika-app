type Submenu = {
  id?: number;
  label: string;
  order?: number;
  icon?: string;
  pathname?: string | null;
  is_submenu?: boolean;
  tag?: string;
};

type Menu = {
  id?: number;
  label: string;
  order?: number;
  icon: string;
  pathname?: string | null;
  is_submenu?: boolean;
  children?: Submenu[] | [];
  tag?: string;
};

export type { Submenu, Menu };
