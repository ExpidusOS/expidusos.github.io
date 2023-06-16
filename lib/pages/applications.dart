import 'package:flutter/material.dart';
import 'package:expidus_website/layouts.dart';
import 'package:flutter_adaptive_scaffold/flutter_adaptive_scaffold.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:expidus_website/widgets.dart';

class ApplicationsPage extends StatelessWidget {
  const ApplicationsPage({ super.key });

  Widget _buildMainContent(BuildContext context, {
    required double horizPadding,
    SliverGridDelegate? gridDelegate,
  }) =>
    SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: horizPadding,
          vertical: 8.0,
        ),
        child: Column(
          children: [
            Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: Column(
                  children: [
                    Text(
                      AppLocalizations.of(context)!.applicationsTitle,
                      style: Theme.of(context).textTheme.displayLarge,
                    ),
                    Text(
                      AppLocalizations.of(context)!.applicationsSubtitle,
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                  ],
                ),
              ),
            ),
            Builder(
              builder: (context) {
                final cards = [
                  ListTile(
                    leading: Image.asset('assets/img/file-manager.png'),
                    title: Text(
                      AppLocalizations.of(context)!.applicationsFileManagerTitle,
                      style: Theme.of(context).textTheme.headlineLarge,
                    ),
                    subtitle: Text(
                      AppLocalizations.of(context)!.applicationsFileManagerSubtitle,
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                    onTap: () {},
                  ),
                  ListTile(
                    leading: Image.asset('assets/img/keebie.png'),
                    title: Text(
                      AppLocalizations.of(context)!.applicationsKeebieTitle,
                      style: Theme.of(context).textTheme.headlineLarge,
                    ),
                    subtitle: Text(
                      AppLocalizations.of(context)!.applicationsKeebieSubtitle,
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                    onTap: () {},
                  ),
                ];

                if (gridDelegate != null) {
                  return GridView(
                    gridDelegate: gridDelegate,
                    shrinkWrap: true,
                    children: cards,
                  );
                }

                return ListView(
                  shrinkWrap: true,
                  children: cards,
                );
              }
            ),
          ],
        ),
      ),
    );

  @override
  Widget build(BuildContext context) =>
    DefaultLayout(
      child: AdaptiveLayout(
        internalAnimations: false,
        body: SlotLayout(
          config: <Breakpoint, SlotLayoutConfig>{
            Breakpoints.smallAndUp: SlotLayout.from(
              key: const Key('primaryMobile'),
              builder: (_) => _buildMainContent(
                context,
                horizPadding: 8.0,
              ),
            ),
            Breakpoints.large: SlotLayout.from(
              key: const Key('primaryBody'),
              builder: (_) => _buildMainContent(
                context,
                horizPadding: MediaQuery.sizeOf(context).width / 4,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  childAspectRatio: 6.0,
                ),
              ),
            ),
          },
        )
    ),
  );
}
