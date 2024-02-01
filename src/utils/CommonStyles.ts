import {
  ColorValue,
  Dimensions,
  DimensionValue,
  StyleSheet,
} from 'react-native'

const stytles = StyleSheet.create({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  center: { justifyContent: 'center', alignItems: 'center' },
  circle: { borderRadius: Number.MAX_SAFE_INTEGER },
  jc: { justifyContent: 'center' },
  jb: { justifyContent: 'space-between' },
  js: { justifyContent: 'flex-start' },
  je: { justifyContent: 'flex-end' },
  jse: { justifyContent: 'space-evenly' },
  jsa: { justifyContent: 'space-around' },
  ac: { alignItems: 'center' },
  as: { alignItems: 'flex-start' },
  ae: { alignItems: 'flex-end' },
  fwl: { fontWeight: '400' },
  fwm: { fontWeight: '500' },
  fwb: { fontWeight: '700' },
  w100: { width: '100%' },
  h100: { height: '100%' },
  f: { flex: 1 },
  tc: { textAlign: 'center', textAlignVertical: 'center' },
  tac: { textAlign: 'center' },
  tvc: { textAlignVertical: 'center' },
  absolute: { ...StyleSheet.absoluteFillObject },
  shadow: {
    shadowColor: '#999',
    shadowOpacity: 0.33,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 4 },
    elevation: 2,
  },
})

export const ROW = stytles.row
export const SHADOW = stytles.shadow
export const COLUMN = stytles.column
export const ABSOLUTE = stytles.absolute
export const CENTER = stytles.center
export const CIRCLE = stytles.circle
export const FWL = stytles.fwl
export const FWM = stytles.fwm
export const FWB = stytles.fwb
export const JC = stytles.jc
export const JB = stytles.jb
export const JS = stytles.js
export const JE = stytles.je
export const JSE = stytles.jse
export const JSA = stytles.jsa
export const AC = stytles.ac
export const AS = stytles.as
export const AE = stytles.ae
export const W100 = stytles.w100
export const H100 = stytles.h100
export const TC = stytles.tc
export const TAC = stytles.tac
export const TVC = stytles.tvc
export const H = (value?: DimensionValue | number) => {
  return StyleSheet.create({ style: { height: value } }).style
}
export const W = (value?: DimensionValue | number) => {
  return StyleSheet.create({ style: { width: value } }).style
}
export const WH = (value?: DimensionValue | number) => {
  return StyleSheet.create({ style: { width: value, height: value } }).style
}
export const R = (value: number) => {
  return StyleSheet.create({ style: { borderRadius: value } }).style
}
export const RTL = (value: number) => {
  return StyleSheet.create({ style: { borderTopLeftRadius: value } }).style
}
export const RTR = (value: number) => {
  return StyleSheet.create({ style: { borderTopRightRadius: value } }).style
}
export const RT = (value: number) => {
  return StyleSheet.create({
    style: { borderTopLeftRadius: value, borderTopRightRadius: value },
  }).style
}

export const LH = (value: number) => {
  return StyleSheet.create({
    style: { lineHeight: value },
  }).style
}

export const RBL = (value: number) => {
  return StyleSheet.create({ style: { borderBottomLeftRadius: value } }).style
}
export const RBR = (value: number) => {
  return StyleSheet.create({ style: { borderBottomRightRadius: value } }).style
}
export const RB = (value: number) => {
  return StyleSheet.create({
    style: { borderBottomLeftRadius: value, borderBottomRightRadius: value },
  }).style
}
export const BGC = (value: ColorValue) => {
  return StyleSheet.create({ style: { backgroundColor: value } }).style
}
export const OPT = (value: number) => {
  return StyleSheet.create({ style: { opacity: value } }).style
}
export const BW = (value: number) => {
  return StyleSheet.create({ style: { borderWidth: value } }).style
}
export const BC = (value: ColorValue) => {
  return StyleSheet.create({ style: { borderColor: value } }).style
}
export const BS = (value: 'solid' | 'dotted' | 'dashed') => {
  return StyleSheet.create({ style: { borderStyle: value } }).style
}
export const FC = (value: ColorValue) => {
  return StyleSheet.create({ style: { color: value } }).style
}
export const FS = (value: number) => {
  return StyleSheet.create({ style: { fontSize: value } }).style
}
export const MT = (value: number) => {
  return StyleSheet.create({ style: { marginTop: value } }).style
}
export const MB = (value: number) => {
  return StyleSheet.create({ style: { marginBottom: value } }).style
}
export const ML = (value: number) => {
  return StyleSheet.create({ style: { marginLeft: value } }).style
}
export const MR = (value: number) => {
  return StyleSheet.create({ style: { marginRight: value } }).style
}
export const MH = (value: number) => {
  return StyleSheet.create({ style: { marginHorizontal: value } }).style
}
export const MV = (value: number) => {
  return StyleSheet.create({ style: { marginVertical: value } }).style
}
export const M = (value: number) => {
  return StyleSheet.create({ style: { margin: value } }).style
}
export const P = (value: number) => {
  return StyleSheet.create({ style: { padding: value } }).style
}
export const PT = (value: number) => {
  return StyleSheet.create({ style: { paddingTop: value } }).style
}
export const PB = (value: number) => {
  return StyleSheet.create({ style: { paddingBottom: value } }).style
}
export const PL = (value: number) => {
  return StyleSheet.create({ style: { paddingLeft: value } }).style
}
export const PR = (value: number) => {
  return StyleSheet.create({ style: { paddingRight: value } }).style
}
export const PH = (value: number) => {
  return StyleSheet.create({ style: { paddingHorizontal: value } }).style
}
export const PV = (value: number) => {
  return StyleSheet.create({ style: { paddingVertical: value } }).style
}
export const F = stytles.f

export const ScreenWidth = Dimensions.get('window').width

export const ScreenHeight = Dimensions.get('window').height
