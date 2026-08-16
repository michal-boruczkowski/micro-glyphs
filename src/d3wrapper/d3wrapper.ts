import { Selection, BaseType } from "d3-selection";

export interface D3Component<GElement extends BaseType = BaseType, Datum = any, PDatum = any> {
  <PGE extends BaseType, PPGE extends BaseType, PPD>(
    selection: Selection<PGE, PDatum, PPGE, PPD>,
    ...args: any[]
  ): void;

  data(
    fn: (d: PDatum, i: number, groups: BaseType[] | ArrayLike<BaseType>) => Datum[],
    keyFn?: (d: PDatum, i: number, groups: BaseType[] | ArrayLike<BaseType>) => string,
  ): this;

  enter(
    fn: <PGE extends BaseType>(selection: Selection<GElement, Datum, PGE, PDatum>) => any,
  ): this;
  update(
    fn: <PGE extends BaseType>(selection: Selection<GElement, Datum, PGE, PDatum>) => any,
  ): this;
  exit(fn: <PGE extends BaseType>(selection: Selection<GElement, Datum, PGE, PDatum>) => any): this;
  merged(
    fn: <PGE extends BaseType>(selection: Selection<GElement, Datum, PGE, PDatum>) => any,
  ): this;
}

export function createComponent<GElement extends BaseType = BaseType, Datum = any, PDatum = any>(
  tag: string,
  className?: string,
): D3Component<GElement, Datum, PDatum> {
  const selectorString = className ? `${tag}.${className}` : tag;

  type CS = Selection<GElement, Datum, any, PDatum>;

  let _dataFn: (d: PDatum, i: number, groups: BaseType[] | ArrayLike<BaseType>) => Datum[] = (
    d,
  ) => [d as unknown as Datum];
  let _keyFn: (d: PDatum, i: number, groups: BaseType[] | ArrayLike<BaseType>) => string;
  let _enterFn: (selection: CS) => any = (enter) => enter;
  let _updateFn: (selection: CS) => any = (update) => update;
  let _exitFn: (selection: CS) => any = (exit) => exit.remove();
  let _mergedFn: (selection: CS) => any = (merged) => merged;

  const render = function <PGE extends BaseType, PPGE extends BaseType, PPD>(
    selection: Selection<PGE, PDatum, PPGE, PPD>,
  ) {
    const joined = selection.selectAll<GElement, unknown>(selectorString).data(_dataFn, _keyFn);

    const merged = joined.join(
      (enter) => {
        const e = enter.append<GElement>(tag);
        if (className) e.classed(className, true);
        _enterFn(e);
        return e;
      },
      (update) => {
        _updateFn(update);
        return update;
      },
      (exit) => {
        _exitFn(exit);
        return exit;
      },
    );

    _mergedFn(merged);
  };

  const component = render as unknown as D3Component<GElement, Datum, PDatum>;

  component.data = function (fn, keyFn) {
    _dataFn = fn;
    _keyFn = keyFn;
    return this;
  };
  component.enter = function (fn) {
    _enterFn = fn;
    return this;
  };
  component.update = function (fn) {
    _updateFn = fn;
    return this;
  };
  component.exit = function (fn) {
    _exitFn = fn;
    return this;
  };
  component.merged = function (fn) {
    _mergedFn = fn;
    return this;
  };

  return component;
}

export const group = <Datum = any, PDatum = any>(className?: string) =>
  createComponent<SVGGElement, Datum, PDatum>("g", className);

export const path = <Datum = any, PDatum = any>(className?: string) =>
  createComponent<SVGPathElement, Datum, PDatum>("path", className);

export const circle = <Datum = any, PDatum = any>(className?: string) =>
  createComponent<SVGCircleElement, Datum, PDatum>("circle", className);

export const rect = <Datum = any, PDatum = any>(className?: string) =>
  createComponent<SVGRectElement, Datum, PDatum>("rect", className);

export const onClick = <Datum>(
  event: MouseEvent,
  d: Datum & { onClick: (event: MouseEvent) => void },
) => {
  d.onClick(event);
};

export const linearGradient = <Datum = any, PDatum = any>(className?: string) =>
  createComponent<SVGLinearGradientElement, Datum, PDatum>("linearGradient", className);

export const stop = <Datum = any, PDatum = any>(className?: string) =>
  createComponent<SVGStopElement, Datum, PDatum>("stop", className);

export const filter = <Datum = any, PDatum = any>(className?: string) =>
  createComponent<SVGFilterElement, Datum, PDatum>("filter", className);

export const feGaussianBlur = <Datum = any, PDatum = any>(className?: string) =>
  createComponent<SVGFEGaussianBlurElement, Datum, PDatum>("feGaussianBlur", className);

export const feMerge = <Datum = any, PDatum = any>(className?: string) =>
  createComponent<SVGFEMergeElement, Datum, PDatum>("feMerge", className);

export const feMergeNode = <Datum = any, PDatum = any>(className?: string) =>
  createComponent<SVGFEMergeNodeElement, Datum, PDatum>("feMergeNode", className);

export const defs = <Datum = any, PDatum = any>(className?: string) =>
  createComponent<SVGDefsElement, Datum, PDatum>("defs", className);
