import 'package:flutter_web_plugins/url_strategy.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:libtokyo_flutter/libtokyo.dart';
import 'pages.dart';

void main() {
  usePathUrlStrategy();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) =>
    TokyoApp(
      onGenerateTitle: (context) => AppLocalizations.of(context)!.websiteTitle,
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: AppLocalizations.supportedLocales,
      routes: {
        '/': (ctx) => const HomePage(),
        '/download': (ctx) => const DownloadPage(),
        '/applications': (ctx) => const ApplicationsPage(),
      },
    );
}
