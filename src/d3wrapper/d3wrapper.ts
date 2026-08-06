import { Selection, BaseType, EnterElement } from 'd3-selection';

export interface D3Component<
    GElement extends BaseType = BaseType,
    Datum = any,
    PElement extends BaseType = BaseType,
    PDatum = any
> {
    <PGE extends BaseType, PPGE extends BaseType, PPD>(
        selection: Selection<PGE, PDatum, PPGE, PPD>,
        ...args: any[]
    ): void;

    data(fn: (d: PDatum, i: number, groups: BaseType[] | ArrayLike<BaseType>) => Datum[]): this;
    enter(fn: (selection: Selection<GElement, Datum, PElement, PDatum>) => any): this;
    update(fn: (selection: Selection<GElement, Datum, PElement, PDatum>) => any): this;
    exit(fn: (selection: Selection<GElement, Datum, PElement, PDatum>) => any): this;
    merged(fn: (selection: Selection<GElement, Datum, PElement, PDatum>) => any): this;
}

export function createComponent<
    GElement extends BaseType = BaseType,
    Datum = any,
    PElement extends BaseType = BaseType,
    PDatum = any
>(tag: string, className?: string): D3Component<GElement, Datum, PElement, PDatum> {
    const selectorString = className ? `${tag}.${className}` : tag;

    let _dataFn: (d: PDatum, i: number, groups: BaseType[] | ArrayLike<BaseType>) => Datum[] = (d) => [d as unknown as Datum];
    let _enterFn: (selection: Selection<GElement, Datum, PElement, PDatum>) => any = (enter) => enter;
    let _updateFn: (selection: Selection<GElement, Datum, PElement, PDatum>) => any = (update) => update;
    let _exitFn: (selection: Selection<GElement, Datum, PElement, PDatum>) => any = (exit) => exit.remove();
    let _mergedFn: (selection: Selection<GElement, Datum, PElement, PDatum>) => any = (merged) => merged;

    const render = function <PGE extends BaseType, PPGE extends BaseType, PPD>(
        selection: Selection<PGE, PDatum, PPGE, PPD>
    ) {
        const joined = selection.selectAll<GElement, unknown>(selectorString).data(_dataFn);

        const merged = joined.join(
            (enter: Selection<EnterElement, Datum, PGE, PDatum>) => {
                const e = enter.append<GElement>(tag);
                if (className) e.classed(className, true);
                e.call(_enterFn as any);
                return e;
            },
            (update: Selection<GElement, Datum, PGE, PDatum>) => {
                update.call(_updateFn as any);
                return update;
            },
            (exit: Selection<GElement, Datum, PGE, PDatum>) => {
                exit.call(_exitFn as any);
                return exit;
            }
        );

        _mergedFn(merged as any);
    };

    const component = render as unknown as D3Component<GElement, Datum, PElement, PDatum>;

    component.data = function (fn) { _dataFn = fn; return this; };
    component.enter = function (fn) { _enterFn = fn; return this; };
    component.update = function (fn) { _updateFn = fn; return this; };
    component.exit = function (fn) { _exitFn = fn; return this; };
    component.merged = function (fn) { _mergedFn = fn; return this; };

    return component;
}

export const group = <Datum = any, PDatum = any>(className?: string) =>
    createComponent<SVGGElement, Datum, SVGGElement, PDatum>('g', className);

export const circle = <Datum = any, PDatum = any>(className?: string) =>
    createComponent<SVGCircleElement, Datum, SVGCircleElement, PDatum>('circle', className);

export const rect = <Datum = any, PDatum = any>(className?: string) =>
    createComponent<SVGRectElement, Datum, SVGRectElement, PDatum>('rect', className);