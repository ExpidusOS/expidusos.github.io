import 'package:flutter_adaptive_scaffold/flutter_adaptive_scaffold.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:libtokyo_flutter/libtokyo.dart';
import 'package:expidus_website/layouts.dart';
import 'package:expidus_website/widgets.dart';

class HomePage extends StatelessWidget {
  const HomePage({ super.key });

  Widget _buildMainContent(BuildContext context, {
    required double horizPadding,
    required SliverGridDelegate gridDelegate
  }) =>
    SingleChildScrollView(
      child: Column(
        children: [
          Container(
            height: MediaQuery.of(context).size.height / 2.95,
            decoration: const BoxDecoration(
              image: DecorationImage(
                fit: BoxFit.cover,
                image: AssetImage('assets/img/expidus.jpg'),
              ),
            ),
            child: Align(
              alignment: Alignment.bottomRight,
              child: SimpleCard(
                children: [
                  Text(
                    AppLocalizations.of(context)!.homeHeadingCardTitle,
                    style: Theme.of(context).textTheme.headlineLarge,
                  ),
                  Text(
                    AppLocalizations.of(context)!.homeHeadingCardBlurb,
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                ],
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(
              horizontal: horizPadding,
              vertical: 8.0
            ),
            child: Column(
              children: [
                Center(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: Text(
                      AppLocalizations.of(context)!.homeSectionFeaturesTitle,
                      style: Theme.of(context).textTheme.displayLarge,
                    ),
                  ),
                ),
                GridView(
                  gridDelegate: gridDelegate,
                  shrinkWrap: true,
                  children: [
                    SimpleCard(
                      margin: const EdgeInsets.all(8.0),
                      children: [
                        Text(
                          AppLocalizations.of(context)!.homeSectionFeaturesCardCrossPlatformTitle,
                          style: Theme.of(context).textTheme.headlineLarge,
                        ),
                        RichText(
                          text: TextSpan(
                            children: [
                              TextSpan(
                                text: AppLocalizations.of(context)!.homeSectionFeaturesCardCrossPlatformContent1,
                                style: Theme.of(context).textTheme.bodyLarge,
                              ),
                              TextSpan(
                                text: AppLocalizations.of(context)!.homeSectionFeaturesCardCrossPlatformContent2,
                                style: Theme.of(context).textTheme.bodyLarge,
                              ),
                              TextSpan(
                                text: AppLocalizations.of(context)!.homeSectionFeaturesCardCrossPlatformContent3,
                                style: Theme.of(context).textTheme.bodyLarge,
                              ),
                              WidgetSpan(
                                alignment: PlaceholderAlignment.baseline,
                                baseline: TextBaseline.alphabetic,
                                child: TextLink(
                                  Uri.parse('https://wiki.expidusos.com/devices'),
                                  AppLocalizations.of(context)!.homeSectionFeaturesCardCrossPlatformContent4,
                                  style: Theme.of(context).textTheme.bodyLarge!.copyWith(
                                    color: Theme.of(context).colorScheme.primary,
                                    fontWeight: FontWeight.bold,
                                    decoration: TextDecoration.underline,
                                  ),
                                ),
                              ),
                              TextSpan(
                                text: AppLocalizations.of(context)!.homeSectionFeaturesCardCrossPlatformContent5,
                                style: Theme.of(context).textTheme.bodyLarge,
                              ),
                            ],
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                        ),
                      ],
                    ),
                    SimpleCard(
                      margin: const EdgeInsets.all(8.0),
                      children: [
                        Text(
                          AppLocalizations.of(context)!.homeSectionFeaturesCardFOSSTitle,
                          style: Theme.of(context).textTheme.headlineLarge,
                        ),
                        Text(
                          AppLocalizations.of(context)!.homeSectionFeaturesCardFOSSContent,
                          style: Theme.of(context).textTheme.bodyLarge,
                        )
                      ],
                    ),
                    SimpleCard(
                      margin: const EdgeInsets.all(8.0),
                      children: [
                        Text(
                          AppLocalizations.of(context)!.homeSectionFeaturesCardEasyUseCardTitle,
                          style: Theme.of(context).textTheme.headlineLarge,
                        ),
                        Text(
                          AppLocalizations.of(context)!.homeSectionFeaturesCardEasyUseCardContent,
                          style: Theme.of(context).textTheme.bodyLarge,
                        ),
                      ],
                    )
                  ].map((child) => Expanded(child: child)).toList(),
                ),
              ],
            ),
          ),
        ],
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
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 1,
                )
              ),
            ),
            Breakpoints.large: SlotLayout.from(
              key: const Key('primaryBody'),
              builder: (_) => _buildMainContent(
                context,
                horizPadding: MediaQuery.sizeOf(context).width / 4,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                ),
              ),
            ),
          },
        )
      ),
    );
}
