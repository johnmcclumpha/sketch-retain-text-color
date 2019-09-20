import sketch from 'sketch'
const document = sketch.getSelectedDocument()
var Settings = require('sketch/settings')

export function recordTextColor() {
  const selectedLayers = document.selectedLayers
  const selectedCount = selectedLayers.length

  if (selectedCount > 0) {
    selectedLayers.forEach(function (layer, i) {
      if(layer.type === 'Text') {
        Settings.setLayerSettingForKey(layer, 'retain-text-color', { color: layer.style.textColor })
      }
    })
  }

}

export function applyTextColor() {
  const selectedLayers = document.selectedLayers
  const selectedCount = selectedLayers.length

  if (selectedCount > 0) {
    selectedLayers.forEach(function (layer, i) {
      var orignialColor = Settings.layerSettingForKey(layer, 'retain-text-color')
      var mscolor = MSImmutableColor.colorWithSVGString(orignialColor.color).newMutableCounterpart()

      layer.sketchObject.textColor = mscolor
      Settings.setLayerSettingForKey(layer, 'retain-text-color', undefined)
    })
  }
}

export function onTextStyleChange(context) {

  if(context.action == 'ApplySharedTextStyle.begin') {
    recordTextColor()
  }
  if(context.action == 'ApplySharedTextStyle.finish') {
    applyTextColor()
  }

}
