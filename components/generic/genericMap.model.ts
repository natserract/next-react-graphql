interface GenericListProps<T> {
    items: T[];
    render: (item: T, index?: string | number) => JSX.Element
}

export type ComponentTypes<T = any> = React.FC<GenericListProps<T>>;