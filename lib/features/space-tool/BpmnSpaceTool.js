import inherits from 'inherits';

import SpaceTool from 'diagram-js/lib/features/space-tool/SpaceTool';

import { is } from '../../util/ModelUtil';


export default function BpmnSpaceTool(injector) {
  injector.invoke(SpaceTool, this);
}

BpmnSpaceTool.$inject = [
  'injector'
];

inherits(BpmnSpaceTool, SpaceTool);

BpmnSpaceTool.prototype.calculateAdjustments = function(elements, axis, delta, start) {
  var adjustments = SpaceTool.prototype.calculateAdjustments.call(this, elements, axis, delta, start),
      movingShapes = adjustments.movingShapes,
      resizingShapes = adjustments.resizingShapes;

  // move labels
  movingShapes.forEach(function(shape) {
    if (shape.label && movingShapes.indexOf(shape.label) === -1) {
      movingShapes.push(shape.label);
    }
  });

  // do not resize text annotations
  resizingShapes = resizingShapes.filter(function(shape) {
    return !is(shape, 'bpmn:TextAnnotation');
  });

  return {
    movingShapes: movingShapes,
    resizingShapes: resizingShapes
  };
};