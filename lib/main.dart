import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:libtokyo_flutter/libtokyo.dart';
import 'pages.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  MyApp({super.key});

  @override
  Widget build(BuildContext context) =>
    TokyoApp(
      title: 'ExpidusOS',
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: AppLocalizations.supportedLocales,
      routes: {
        '/': (ctx) => const HomePage(),
        '/download': (ctx) => const DownloadPage(),
        '/applications': (ctx) => const ApplicationsPage(),
      },
    );
}
