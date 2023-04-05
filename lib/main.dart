import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
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

  final ValueNotifier<ThemeMode> themeNotifier = ValueNotifier(ThemeMode.dark);

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
          localizationsDelegates: AppLocalizations.localizationsDelegates,
          supportedLocales: AppLocalizations.supportedLocales,
          routes: {
            '/': (ctx) => HomePage(themeNotifier: themeNotifier),
            '/download': (ctx) => DownloadPage(themeNotifier: themeNotifier),
          },
        );
      });
  }
}
