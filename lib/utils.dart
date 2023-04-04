import 'package:flutter/material.dart';

enum AutoScaler {
  small(maxWidth: 639.9),
  medium(minWidth: 640.0, maxWidth: 959.9),
  large(minWidth: 960.0),
  ltMedium(maxWidth: 639.9),
  ltLarge(maxWidth: 959.9);

  const AutoScaler({ this.minWidth = 0.0, this.maxWidth = 0.0 });

  final double minWidth;
  final double maxWidth;

  bool fits(MediaQueryData mq) {
    if (this.maxWidth != 0.0) {
      if (mq.size.width >= this.maxWidth) return false;
    }
    if (this.minWidth != 0.0) {
      if (mq.size.width <= this.minWidth) return false;
    }
    return true;
  }

  static AutoScaler? of(MediaQueryData mq) {
    var sizes_iter = AutoScaler.values.iterator;
    while (sizes_iter.moveNext()) {
      if (sizes_iter.current.fits(mq)) return sizes_iter.current;
    }
    return null;
  }
}
