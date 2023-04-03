import 'package:flutter/material.dart';
import 'package:libtokyo/libtokyo.dart';
import 'pages.dart';

void main() => runApp(MyApp());

ThemeData _patchTheme(ThemeData input) => input.copyWith(
  appBarTheme: input.appBarTheme.copyWith(
    centerTitle: false,
  ),
);

class MyApp extends StatelessWidget {
  MyApp({super.key});

  final ValueNotifier<ThemeMode> themeNotifier = ValueNotifier(ThemeMode.light);

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<ThemeMode>(
      valueListenable: themeNotifier,
      builder: (_, ThemeMode currentMode, __) {
        return MaterialApp(
          title: 'ExpidusOS',
          theme: _patchTheme(LibTokyoThemeData.nightLight()),
          darkTheme: _patchTheme(LibTokyoThemeData.night()),
          themeMode: currentMode,
          debugShowCheckedModeBanner: false,
          routes: {
            '/': (ctx) => HomePage(themeNotifier: themeNotifier),
          },
        );
      });
  }
}
