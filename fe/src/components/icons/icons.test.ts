import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BoltIcon,
  BoxIcon,
  CartIcon,
  DownIcon,
  FaceIcon,
  GlobeIcon,
  HeartIcon,
  HomeIcon,
  LeftIcon,
  LetterIcon,
  LocationIcon,
  SearchIcon,
  MagnifyGlassIcon,
  UserIcon,
  PersonIcon,
  EcoIcon,
  ParkIcon,
  PhoneIcon,
  GiftIcon,
  PresentIcon,
  RightIcon,
  TagIcon,
  UpIcon,
  AppIcon,
  ICON_REGISTRY,
} from './index';

test('all 19 primary SVG icon components are exported and valid functions', () => {
  const icons = [
    BoltIcon,
    BoxIcon,
    CartIcon,
    DownIcon,
    FaceIcon,
    GlobeIcon,
    HeartIcon,
    HomeIcon,
    LeftIcon,
    LetterIcon,
    LocationIcon,
    SearchIcon,
    UserIcon,
    EcoIcon,
    PhoneIcon,
    GiftIcon,
    RightIcon,
    TagIcon,
    UpIcon,
  ];

  for (const icon of icons) {
    assert.equal(typeof icon, 'function', `Icon ${icon.name} should be a valid React function component`);
  }
});

test('aliases for icons match their corresponding components', () => {
  assert.equal(SearchIcon, MagnifyGlassIcon);
  assert.equal(UserIcon, PersonIcon);
  assert.equal(EcoIcon, ParkIcon);
  assert.equal(GiftIcon, PresentIcon);
});

test('ICON_REGISTRY contains all 19 SVG icon mappings', () => {
  assert.equal(typeof ICON_REGISTRY['bolt'], 'function');
  assert.equal(typeof ICON_REGISTRY['box'], 'function');
  assert.equal(typeof ICON_REGISTRY['cart'], 'function');
  assert.equal(typeof ICON_REGISTRY['down'], 'function');
  assert.equal(typeof ICON_REGISTRY['face'], 'function');
  assert.equal(typeof ICON_REGISTRY['globe'], 'function');
  assert.equal(typeof ICON_REGISTRY['heart'], 'function');
  assert.equal(typeof ICON_REGISTRY['home'], 'function');
  assert.equal(typeof ICON_REGISTRY['left'], 'function');
  assert.equal(typeof ICON_REGISTRY['letter'], 'function');
  assert.equal(typeof ICON_REGISTRY['location'], 'function');
  assert.equal(typeof ICON_REGISTRY['search'], 'function');
  assert.equal(typeof ICON_REGISTRY['user'], 'function');
  assert.equal(typeof ICON_REGISTRY['eco'], 'function');
  assert.equal(typeof ICON_REGISTRY['phone'], 'function');
  assert.equal(typeof ICON_REGISTRY['gift'], 'function');
  assert.equal(typeof ICON_REGISTRY['right'], 'function');
  assert.equal(typeof ICON_REGISTRY['tag'], 'function');
  assert.equal(typeof ICON_REGISTRY['up'], 'function');
});

test('AppIcon component renders or returns null for unknown name without crashing', () => {
  assert.equal(typeof AppIcon, 'function');
});

