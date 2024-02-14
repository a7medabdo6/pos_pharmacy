'use client';
import Header from '@/layouts/beryllium/beryllium-header';
import BerylliumLeftSidebarFixed from '@/layouts/beryllium/beryllium-left-sidebar-fixed';
import cn from '@/utils/class-names';
import SidebarExpandable from '@/layouts/beryllium/beryllium-sidebar-Expandable';
import { useBerylliumSidebars } from '@/layouts/beryllium/use-beryllium-sidebar';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';

export default function BerylliumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { expandedLeft } = useBerylliumSidebars();
  const { layout } = useLayout();

  return (
    <main className={cn('flex min-h-screen flex-grow')}>
      <BerylliumLeftSidebarFixed />
      <SidebarExpandable />
      <div className="flex w-full flex-col ">
        <Header className="xl:ms-[88px]" />
        <div
          className={cn(
            'flex flex-grow flex-col gap-4 px-4 pb-6 duration-200 @container md:px-5 lg:pb-8  xl:pe-8 ',
            expandedLeft ? 'xl:ps-[414px]' : 'xl:ps-[104px]'
          )}
        >
          <div className="grow xl:mt-4">{children}</div>
        </div>
      </div>
    </main>
  );
}
